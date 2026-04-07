namespace shoplify_backend.Dtos;

public record class CreateItemDto(
    string Name,
    string Type,
    string Description,
    decimal Price,
    int Stock
);
