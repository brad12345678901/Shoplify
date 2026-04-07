namespace shoplify_backend.Dtos;

public record class UpdateItemDto(
    string Name,
    string Type,
    string Description,
    decimal Price,
    int Stock
);