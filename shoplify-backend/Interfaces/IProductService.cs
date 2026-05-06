namespace shoplify_backend.Interfaces;

using shoplify_backend.Dtos;
using shoplify_backend.Models;

public interface IProductService
{
    Task<IEnumerable<ProductDto>> GetActiveProductsAsync(string baseURL);
    Task<ProductDto> GetActiveProductAsync(int id, string baseURL);

    Task<ProductDto> AddProductAsync(ProductRequestDto dto, string baseURL);

    Task<ProductDto> UpdateProductAsync(int id, UpdateProductRequestDto dto, string baseURL);

    Task<ProductDto> DeleteProductAsync(int id, string baseURL);
}
