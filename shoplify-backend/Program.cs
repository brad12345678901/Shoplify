using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shoplify_backend.Data;
using shoplify_backend.EndPoints;
using shoplify_backend.Seeders;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ShoplifyContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("shoplify-be"))
);

builder.Services.AddValidation();

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

//API
app.MapGet(
    "/testrun",
    async (ShoplifyContext context) =>
    {
        try
        {
            // Check if the database is reachable
            bool canConnect = await context.Database.CanConnectAsync();

            if (canConnect)
            {
                // Try a simple query to ensure the schema is correct
                var itemCount = await context.Items.CountAsync();

                // In Minimal APIs, use Results.Ok instead of return Ok
                return Results.Ok(
                    new { Message = "Connection Successful!", TotalItems = itemCount }
                );
            }

            return Results.StatusCode(500);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return Results.BadRequest($"Error: {ex.Message}");
        }
    }
);

app.MapItemsEndPoint();

app.Run();
