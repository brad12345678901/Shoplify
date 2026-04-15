using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shoplify_backend.Data;
using shoplify_backend.Dtos;
using shoplify_backend.Models;

namespace shoplify_backend.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class ProductsController(ShoplifyContext db) : ControllerBase
{
    private readonly ShoplifyContext _db = db;

    [HttpGet]
    public async Task<IActionResult> Index()
    {
        var products = await _db
            .Products.Where(product => product.Deleted_At == null)
            .Include(p => p.Category)
            .Select(p => new ProductDto(
                p.Id,
                p.Name,
                p.Type,
                p.Description,
                p.Price,
                p.Stock,
                p.CategoryId,
                p.Category != null ? p.Category.Name : string.Empty,
                p.Created_At.ToString("MMM dd, yyyy"),
                p.Updated_At.ToString("MMM dd, yyyy")
            ))
            .Take(10)
            .ToListAsync();

        var response = new
        {
            success = true,
            message = "Product fetched Successfully",
            data = products,
        };

        return Ok(response);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetItem(int id)
    {
        var product = await _db.Products.FindAsync(id);

        if (product is null)
        {
            return NotFound(
                new
                {
                    success = false,
                    message = $"Product {id} was not found",
                    data = product,
                }
            );
        }

        if (product.Deleted_At is not null)
        {
            return NotFound(
                new
                {
                    success = false,
                    message = $"Product {id} was not found",
                    data = (Products?)null,
                }
            );
        }

        return Ok(
            new
            {
                success = true,
                message = $"Product {id} was fetched Successfully",
                data = product,
            }
        );
    }

    [HttpPost]
    public async Task<IActionResult> AddItem(ProductRequestDto createdItem)
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
                    data = (Products?)null,
                }
            );
        }
        Products item = new()
        {
            Name = createdItem.Name,
            Type = createdItem.Type,
            CategoryId = createdItem.CategoryId,
            Description = createdItem.Description,
            Price = createdItem.Price,
            Stock = createdItem.Stock,
        };
        _db.Products.Add(item);
        _db.SaveChanges();

        var response = new
        {
            success = true,
            message = "Product added to Shoplify Inventory",
            data = item,
        };

        return CreatedAtAction(nameof(GetItem), new { id = item.Id }, response);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateItem(int id, ProductRequestDto updateProduct)
    {
        var existingProduct = await _db.Products.FindAsync(id);
        DateTime today = DateTime.UtcNow;
        if (existingProduct is null)
        {
            return NotFound(
                new
                {
                    success = false,
                    message = $"Product ID {id} do not exist",
                    data = (Products?)null,
                }
            );
        }

        existingProduct.Name = updateProduct.Name;
        existingProduct.Type = updateProduct.Type;
        existingProduct.CategoryId = updateProduct.CategoryId;
        existingProduct.Description = updateProduct.Description;
        existingProduct.Price = updateProduct.Price;
        existingProduct.Stock = updateProduct.Stock;
        existingProduct.Updated_At = today;

        await _db.SaveChangesAsync();

        return Ok(
            new
            {
                success = true,
                message = $"Product ID {id} was updated",
                data = existingProduct,
            }
        );
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteItem(int id)
    {
        var existingProduct = await _db.Products.FindAsync(id);
        DateTime today = DateTime.UtcNow;
        if (existingProduct is null)
        {
            return NotFound(
                new
                {
                    success = false,
                    message = $"Product ID {id} do not exist",
                    data = (Products?)null,
                }
            );
        }

        if (existingProduct.Deleted_At is not null)
            return NotFound(
                new
                {
                    success = false,
                    message = $"Product do not exist or already deleted",
                    data = (Products?)null,
                }
            );

        existingProduct.Deleted_At = today;

        await _db.SaveChangesAsync();

        return Ok(
            new
            {
                success = true,
                message = $"Product ID {id} was deleted successfully",
                data = existingProduct,
            }
        );
    }

    // [HttpPost("uploadPicture")]
    // public async Task<IActionResult> UploadFile(IFormFile file)
    // {
        
    // }
}
