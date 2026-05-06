using System.Net;
using System.Text;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using shoplify_backend.Data;
using shoplify_backend.Dtos;
using shoplify_backend.Exceptions;
using shoplify_backend.Interfaces;
using shoplify_backend.Models;
using shoplify_backend.Seeders;
using shoplify_backend.Services;

var builder = WebApplication.CreateBuilder(args);

//SETUP DATABASE
builder.Services.AddDbContext<ShoplifyContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("shoplify-be"),
        option => option.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery)
    )
);

//Authorization & Authentication
builder.Services.AddIdentity<Users, IdentityRole>().AddEntityFrameworkStores<ShoplifyContext>();

//Allow Frontend Requests
var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowFrontend",
        policy =>
        {
            policy.WithOrigins(allowedOrigins!).AllowAnyHeader().AllowAnyMethod();
        }
    );
});

//ExceptionHandler
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails(); // Required for modern exception handling

//DEPENDENCY INJECT
builder.Services.AddScoped<IFileService, LocalImageFileService>();
builder.Services.AddScoped<IProductService, ProductService>();

builder.Services.AddValidation();
builder
    .Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.PropertyNamingPolicy = System
            .Text
            .Json
            .JsonNamingPolicy
            .CamelCase;
    });

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.InvalidModelStateResponseFactory = context =>
    {
        var errors = context
            .ModelState.Where(e => e.Value?.Errors.Count > 0)
            .ToDictionary(
                kvp => kvp.Key,
                kvp => kvp.Value!.Errors.Select(e => e.ErrorMessage).ToArray()
            );

        var response = new ErrorResponse
        {
            Status = (int)HttpStatusCode.BadRequest,
            Message = "Form Request Validation Error",
            Errors = errors,
        };

        return new BadRequestObjectResult(response);
    };
});

var app = builder.Build();

//Seeder
if (args.Contains("--seed"))
{
    using var scope = app.Services.CreateScope();
    try
    {
        int seedIndex = Array.IndexOf(args, "--seed");

        string? targetSeeder = null;

        if (seedIndex + 1 < args.Length && !args[seedIndex + 1].StartsWith('-'))
        {
            targetSeeder = args[seedIndex + 1];
        }

        var context = scope.ServiceProvider.GetRequiredService<ShoplifyContext>();
        await DBMasterSeeder.RunSeeders(context, targetSeeder);
    }
    catch (Exception err)
    {
        Console.WriteLine($"Error: {err}");
    }
    return;
}

//Enable CORS
if (app.Environment.IsDevelopment())
{
    //AUTO MIGRATE ON DEVELOPMENT
    using (var scope = app.Services.CreateScope())
    {
        var context = scope.ServiceProvider.GetRequiredService<ShoplifyContext>();
        context.Database.Migrate();

        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        if (!await roleManager.RoleExistsAsync(Roles.Member))
        {
            await roleManager.CreateAsync(new IdentityRole(Roles.Member));
        }
        if (!await roleManager.RoleExistsAsync(Roles.Merchant))
        {
            await roleManager.CreateAsync(new IdentityRole(Roles.Merchant));
        }
    }

    app.UseCors("AllowFrontend");
}

app.MapControllers();

//Storage Path
var storagePath = Path.Combine(builder.Environment.ContentRootPath, "Storage");
app.UseStaticFiles(
    new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(storagePath),
        RequestPath = "/cdn",
    }
);

app.UseExceptionHandler();

app.Run();
