using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shoplify_backend.Data;
using shoplify_backend.Dtos;
using shoplify_backend.Models;

namespace shoplify_backend.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class ItemsController(ShoplifyContext db) : ControllerBase
{
    private readonly ShoplifyContext _db = db;

    [HttpGet]
    public async Task<IActionResult> Index()
    {
        var items = await _db.Items.Where(item => item.Deleted_At == null).ToListAsync();

        var response = new
        {
            success = true,
            message = "Items fetched Successfully",
            items,
        };

        return Ok(response);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetItem(int id)
    {
        var item = await _db.Items.FindAsync(id);

        if (item is null)
        {
            return NotFound(
                new
                {
                    success = false,
                    message = $"Item {id} was not found",
                    item,
                }
            );
        }

        if (item.Deleted_At is not null)
        {
            return NotFound(
                new
                {
                    success = false,
                    message = $"Item {id} was not found",
                    item = (Item?)null,
                }
            );
        }

        return Ok(
            new
            {
                success = true,
                message = $"Item {id} was fetched Successfully",
                item,
            }
        );
    }

    [HttpPost]
    public async Task<IActionResult> AddItem(ItemRequestDto createdItem)
    {
        DateTime today = DateTime.UtcNow;

        var existingCategory = await _db.Category.AnyAsync(c => c.Id == createdItem.CategoryId);
        if (!existingCategory)
        {
            return BadRequest(
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
        _db.Items.Add(item);
        _db.SaveChanges();

        var response = new
        {
            success = true,
            message = "Item added to Shoplify Inventory",
            data = item,
        };

        return CreatedAtAction(nameof(GetItem), new { id = item.Id }, response);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateItem(int id, ItemRequestDto updateItem)
    {
        var existingItem = await _db.Items.FindAsync(id);
        DateTime today = DateTime.UtcNow;
        if (existingItem is null)
        {
            return NotFound(
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

        await _db.SaveChangesAsync();

        return Ok(
            new
            {
                success = true,
                message = $"Item ID {id} was updated",
                data = existingItem,
            }
        );
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteItem(int id)
    {
        var existingItem = await _db.Items.FindAsync(id);
        DateTime today = DateTime.UtcNow;
        if (existingItem is null)
        {
            return NotFound(
                new
                {
                    success = false,
                    message = $"Item ID {id} do not exist",
                    data = (Item?)null,
                }
            );
        }

        if (existingItem.Deleted_At is not null)
            return NotFound(
                new
                {
                    success = false,
                    message = $"Item do not exist or already deleted",
                    data = (Item?)null,
                }
            );

        existingItem.Deleted_At = today;

        await _db.SaveChangesAsync();

        return Ok(
            new
            {
                success = true,
                message = $"Item ID {id} was deleted successfully",
                data = existingItem,
            }
        );
    }
}
