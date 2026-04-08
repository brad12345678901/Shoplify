namespace shoplify_backend.Dtos;

// A DTO is a contract between a client and a server since it represents
// a shared agreement about how will the data will be transferred and used
public record class ItemDto(
    int Id,
    string Name,
    string Type,
    int CategoryId,
    string Description,
    decimal Price,
    int Stock,
    DateTime Created_at
);
