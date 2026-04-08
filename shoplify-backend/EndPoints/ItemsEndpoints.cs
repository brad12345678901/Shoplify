using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using shoplify_backend.Data;
using shoplify_backend.Dtos;
using shoplify_backend.Models;

namespace shoplify_backend.EndPoints;

public static class ItemsEndpoints
{
    public static void MapItemsEndPoint(this WebApplication app)
    {
        var group = app.MapGroup("/items");

        const string GetItemEndpoint = "GetItem";

        //GET All Items
        group.MapGet(
            "/",
            async (ShoplifyContext db) =>
            {
                var items = await db.Items.Where(item => item.Deleted_At == null).ToListAsync();

                var response = new
                {
                    success = true,
                    message = "Items fetched Successfully",
                    items,
                };

                return Results.Ok(response);
            }
        );

        //GET Specific Item
        group
            .MapGet(
                "/{id:int}",
                async (int id, ShoplifyContext db) =>
                {
                    var item = await db.Items.FindAsync(id);

                    bool itemIsEmpty = item is null;

                    var response = new
                    {
                        success = !itemIsEmpty,
                        message = itemIsEmpty
                            ? $"Item ID {id} was not found"
                            : $"Item ID {id} fetched successfully",
                        item,
                    };

                    return Results.Json(response, statusCode: item is null ? 404 : 201);
                }
            )
            .WithName(GetItemEndpoint);

        //Create Item
        group.MapPost(
            "/",
            async (ItemRequestDto createdItem, ShoplifyContext db) =>
            {
                DateTime today = DateTime.UtcNow;
                var existingCategory = await db.Category.AnyAsync(c =>
                    c.Id == createdItem.CategoryId
                );
                if (!existingCategory)
                {
                    return Results.BadRequest(
                        new
                        {
                            success = false,
                            message = $"Category ID {createdItem.CategoryId} do not exist",
                            data = (Item?)null,
                        }
                    );
                }
                Item item = new()
                {
                    Name = createdItem.Name,
                    Type = createdItem.Type,
                    CategoryId = createdItem.CategoryId,
                    Description = createdItem.Description,
                    Price = createdItem.Price,
                    Stock = createdItem.Stock,
                };
                db.Items.Add(item);
                db.SaveChanges();

                return Results.Created(
                    GetItemEndpoint,
                    new
                    {
                        success = true,
                        message = "Item added to Shoplify Inventory",
                        data = item,
                    }
                );
            }
        );

        //Update Function
        group.MapPut(
            "/{id:int}",
            async (int id, ItemRequestDto updateItem, ShoplifyContext db) =>
            {
                var existingItem = await db.Items.FindAsync(id);
                DateTime today = DateTime.UtcNow;
                if (existingItem is null)
                {
                    return Results.NotFound(
                        new
                        {
                            success = false,
                            message = $"Item ID {id} do not exist",
                            data = (Item?)null,
                        }
                    );
                }

                existingItem.Name = updateItem.Name;
                existingItem.Type = updateItem.Type;
                existingItem.CategoryId = updateItem.CategoryId;
                existingItem.Description = updateItem.Description;
                existingItem.Price = updateItem.Price;
                existingItem.Stock = updateItem.Stock;
                existingItem.Updated_At = today;

                await db.SaveChangesAsync();

                return Results.Ok(
                    new
                    {
                        success = true,
                        message = $"Item ID {id} was updated",
                        data = existingItem,
                    }
                );
            }
        );

        //DELETE Function
        group.MapDelete(
            "/{id:int}",
            async (int id, ShoplifyContext db) =>
            {
                var existingItem = await db.Items.FindAsync(id);
                DateTime today = DateTime.UtcNow;
                if (existingItem is null)
                {
                    return Results.NotFound(
                        new
                        {
                            success = false,
                            message = $"Item ID {id} do not exist",
                            data = (Item?)null,
                        }
                    );
                }

                existingItem.Deleted_At = today;

                await db.SaveChangesAsync();

                return Results.Ok(
                    new
                    {
                        success = true,
                        message = $"Item ID {id} was deleted successfully",
                        data = existingItem,
                    }
                );
            }
        );
    }
}
