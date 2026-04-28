using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shoplify_backend.Data;
using shoplify_backend.Interfaces;
using shoplify_backend.Seeders;
using shoplify_backend.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ShoplifyContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("shoplify-be"))
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
builder.Services.AddScoped<IFileService, LocalFileService>();
builder.Services.AddValidation();
builder
    .Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
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
app.Run();
