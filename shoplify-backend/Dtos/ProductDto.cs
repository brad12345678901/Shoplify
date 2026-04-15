
namespace shoplify_backend.Dtos;

// A DTO is a contract between a client and a server since it represents
// a shared agreement about how will the data will be transferred and used
public record class ProductDto(
    int Id,
    string Name,
    string Type,
    string Description,
    decimal Price,
    int Stock,
    int CategoryId,
    string CategoryName,
    string Created_at,
    string Updated_at
);
