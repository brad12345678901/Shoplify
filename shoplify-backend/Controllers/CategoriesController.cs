using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shoplify_backend.Data;
using shoplify_backend.Models;

namespace shoplify_backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoriesController(ShoplifyContext db) : ControllerBase
{
    private readonly ShoplifyContext _db = db;

    [HttpGet]
    public async Task<IActionResult> Index()
    {
        var categories = await _db
            .Category.Where(category => category.Deleted_At == null)
            .Select(category => new { id = category.Id, category_name = category.Name })
            .ToListAsync();

        var response = new
        {
            success = true,
            message = "Categories fetched Successfully",
            data = categories,
        };

        return Ok(response);
    }
}
