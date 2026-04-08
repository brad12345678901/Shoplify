using shoplify_backend.Data;
using shoplify_backend.Models;

namespace shoplify_backend.Seeders;

public class CategorySeeder : ISeeder
{
    public void Seed(ShoplifyContext context)
    {
        try
        {
            context.Database.EnsureCreated();
            var categories = new Category[] { new() { Name = "Laptop" } };
            context.Category.AddRange(categories);
            context.SaveChanges();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error:{ex}");
        }
    }
}
