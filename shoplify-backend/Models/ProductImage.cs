namespace shoplify_backend.Models;

public class ProductImage
{
    public int Id { get; set; }
    public required string Url { get; set; }

    public int ProductId { get; set; }
}
