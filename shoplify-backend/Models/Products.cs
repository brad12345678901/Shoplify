namespace shoplify_backend.Models;

public class Products
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public required string Type { get; set; }

    public Category? Category { get; set; }

    public required int CategoryId { get; set; }

    public required string Description { get; set; }

    public decimal Price { get; set; }

    public int Stock { get; set; }

    public DateTime Created_At { get; set; } = DateTime.UtcNow;

    public DateTime Updated_At { get; set; } = DateTime.UtcNow;

    public DateTime? Deleted_At { get; set; } = null;

    public ICollection<ProductImage>? ProductImages { get; set; }
}
