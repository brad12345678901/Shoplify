using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shoplify_backend.Data;
using shoplify_backend.EndPoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ShoplifyContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddValidation();

var app = builder.Build();

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
            return Results.BadRequest($"Error: {ex.Message}");
        }
    }
);

app.MapItemsEndPoint();

app.Run();
