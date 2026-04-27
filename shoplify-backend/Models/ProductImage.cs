namespace shoplify_backend.Models;

public class ProductImage
{
    public int Id { get; set; }
    public required string FileName { get; set; }
    public required string Url { get; set; }
    public required string ContentType { get; set; }
    public long Size { get; set; }
    public required int ProductId { get; set; }
    public Products? Product { get; set; }
}
