using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shoplify_backend.Data;
using shoplify_backend.Dtos;
using shoplify_backend.Interfaces;
using shoplify_backend.Models;

namespace shoplify_backend.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class ProductsController(
    ShoplifyContext db,
    IFileService fileService,
    IProductService productService
) : ControllerBase
{
    private readonly ShoplifyContext _db = db;

    private readonly IFileService _fileService = fileService;

    private readonly IProductService _productService = productService;

    [HttpGet]
    public async Task<IActionResult> Index()
    {
        var baseURL = $"{Request.Scheme}://{Request.Host}";

        var products = await _productService.GetActiveProductsAsync(baseURL);

        var response = new
        {
            success = true,
            message = "Product fetched Successfully",
            data = products,
        };

        return Ok(response);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetProduct(int id)
    {
        var baseURL = $"{Request.Scheme}://{Request.Host}";

        var product = await _productService.GetActiveProductAsync(id, baseURL);

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
    public async Task<IActionResult> AddProduct([FromForm] ProductRequestDto createdItem)
    {
        var baseURL = $"{Request.Scheme}://{Request.Host}";
        var item = await _productService.AddProductAsync(createdItem, baseURL);

        if (item == null)
        {
            return BadRequest(
                new
                {
                    success = false,
                    message = "Something Wrong Happened",
                    data = item,
                }
            );
        }

        return CreatedAtAction(
            nameof(GetProduct),
            new { id = item.Id },
            new
            {
                success = true,
                message = "Product added to Shoplify Inventory",
                data = item,
            }
        );
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateProduct(
        int id,
        [FromForm] UpdateProductRequestDto updateProduct
    )
    {
        var baseURL = $"{Request.Scheme}://{Request.Host}";
        var existingProduct = await _productService.UpdateProductAsync(id, updateProduct, baseURL);

        if (existingProduct == null)
        {
            return BadRequest(
                new
                {
                    success = false,
                    message = "Something Wrong Happened",
                    data = existingProduct,
                }
            );
        }

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
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var baseURL = $"{Request.Scheme}://{Request.Host}";
        var deletedProduct = await _productService.DeleteProductAsync(id, baseURL);

        await _db.SaveChangesAsync();

        return Ok(
            new
            {
                success = true,
                message = $"Product ID {id} was deleted successfully",
                data = deletedProduct,
            }
        );
    }
}
