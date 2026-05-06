using System.Globalization;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using shoplify_backend.Data;
using shoplify_backend.Dtos;
using shoplify_backend.Exceptions;
using shoplify_backend.Interfaces;
using shoplify_backend.Models;

public class ProductService(ShoplifyContext db, IFileService fileService) : IProductService
{
    private readonly ShoplifyContext _db = db;

    private readonly IFileService _fileService = fileService;

    public async Task<IEnumerable<ProductDto>> GetActiveProductsAsync(string baseURL)
    {
        var products = await _db
            .Products.Where(product => product.Deleted_At == null)
            .Select(p => new ProductDto(
                p.Id,
                p.Name,
                p.Type,
                p.Description,
                p.Price.ToString("C", new CultureInfo("en-PH")),
                p.Stock,
                p.CategoryId,
                p.Category != null ? p.Category.Name : string.Empty,
                p.Created_At.ToString("MMM dd, yyyy"),
                p.Updated_At.ToString("MMM dd, yyyy"),
                p.ProductImages != null
                    ? p.ProductImages.Select(img => $"{baseURL}/cdn/{img.Url}").ToList()
                    : new List<string>()
            ))
            .Take(10)
            .ToListAsync();

        return products;
    }

    public async Task<ProductDto> GetActiveProductAsync(int id, string baseURL)
    {
        var product =
            await _db
                .Products.Where(p => p.Id == id)
                .Where(p => p.Deleted_At == null)
                .Select(p => new ProductDto(
                    p.Id,
                    p.Name,
                    p.Type,
                    p.Description,
                    p.Price.ToString("C", new CultureInfo("en-PH")),
                    p.Stock,
                    p.CategoryId,
                    p.Category != null ? p.Category.Name : string.Empty,
                    p.Created_At.ToString("MMM dd, yyyy"),
                    p.Updated_At.ToString("MMM dd, yyyy"),
                    p.ProductImages != null
                        ? p.ProductImages.Select(img => $"{baseURL}/cdn/{img.Url}").ToList()
                        : new List<string>()
                ))
                .FirstOrDefaultAsync()
            ?? throw new ShoplifyException(
                $"Product ID {id} not Found!",
                System.Net.HttpStatusCode.NotFound
            );

        return product;
    }

    public async Task<ProductDto> AddProductAsync(ProductRequestDto createdItem, string baseURL)
    {
        DateTime today = DateTime.UtcNow;

        var category = await _db.Category.FirstOrDefaultAsync(c => c.Id == createdItem.Category);
        if (category == null)
        {
            throw new ShoplifyException(
                $"Category ID {createdItem.Category} not Found!",
                System.Net.HttpStatusCode.NotFound
            );
        }

        using (var transaction = await _db.Database.BeginTransactionAsync())
        {
            try
            {
                Products item = new()
                {
                    Name = createdItem.Name,
                    Type = createdItem.Type,
                    CategoryId = createdItem.Category,
                    Description = createdItem.Description,
                    Price = createdItem.Price,
                    Stock = createdItem.Stock,
                };
                _db.Products.Add(item);
                await _db.SaveChangesAsync();

                var (location, fileName) = await _fileService.SaveFileAsync(
                    createdItem.File,
                    "products",
                    item.Id,
                    $"{createdItem.Name}-{item.Id}"
                );

                ProductImage productImage = new()
                {
                    FileName = fileName,
                    Url = location,
                    ContentType = createdItem.File.ContentType,
                    Size = createdItem.File.Length,
                    ProductId = item.Id,
                };

                _db.ProductImage.Add(productImage);
                await _db.SaveChangesAsync();

                await transaction.CommitAsync();

                return await GetActiveProductAsync(item.Id, baseURL);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
    }

    public async Task<ProductDto> UpdateProductAsync(
        int id,
        UpdateProductRequestDto updateProduct,
        string baseURL
    )
    {
        var existingProduct = await _db.Products.FindAsync(id);
        DateTime today = DateTime.UtcNow;
        if (existingProduct is null)
        {
            throw new ShoplifyException(
                $"Product ID {id} not Found!",
                System.Net.HttpStatusCode.NotFound
            );
        }

        using (var transaction = await _db.Database.BeginTransactionAsync())
        {
            try
            {
                existingProduct.Name = updateProduct.Name;
                existingProduct.Type = updateProduct.Type;
                existingProduct.CategoryId = updateProduct.Category;
                existingProduct.Description = updateProduct.Description;
                existingProduct.Price = updateProduct.Price;
                existingProduct.Stock = updateProduct.Stock;
                existingProduct.Updated_At = today;

                await _db.SaveChangesAsync();
                await transaction.CommitAsync();
                return await GetActiveProductAsync(existingProduct.Id, baseURL);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
    }

    public async Task<ProductDto> DeleteProductAsync(int id, string baseURL)
    {
        var deletedProduct = await GetActiveProductAsync(id, baseURL);
        var existingProduct = await _db.Products.FindAsync(id);
        DateTime today = DateTime.UtcNow;

        if (existingProduct == null)
        {
            throw new ShoplifyException(
                $"Product ID {id} was not found",
                System.Net.HttpStatusCode.NotFound
            );
        }

        using (var transaction = await _db.Database.BeginTransactionAsync())
        {
            try
            {
                existingProduct.Deleted_At = today;

                await _db.SaveChangesAsync();

                await transaction.CommitAsync();
                return deletedProduct;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
    }
}
