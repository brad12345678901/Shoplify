namespace shoplify_backend.Models;

public class Item
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public required string Type { get; set; }

    public Category? Category { get; set; }

    public int CategoryId { get; set; }

    public required string Description { get; set; }

    public decimal Price { get; set; }
}
