using System;

namespace shoplify_backend.Models;

public class Category
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public DateTime Created_At { get; set; } = DateTime.UtcNow;

    public DateTime Updated_At { get; set; } = DateTime.UtcNow;

    public DateTime? Deleted_At { get; set; } = null;
}
