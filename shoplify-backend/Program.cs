using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using shoplify_backend.Data;
using shoplify_backend.Interfaces;
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

//DEPENDENCY INJECT
builder.Services.AddScoped<IFileService, LocalImageFileService>();

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

//AUTO MIGRATE
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ShoplifyContext>();
    context.Database.Migrate();
}

app.UseCors("AllowFrontend");

app.MapControllers();
var storagePath = Path.Combine(builder.Environment.ContentRootPath, "Storage");
app.UseStaticFiles(
    new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(storagePath),
        RequestPath = "/cdn",
    }
);
app.Run();
