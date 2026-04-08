using System.Data.SqlTypes;
using shoplify_backend.Data;
using shoplify_backend.Models;

namespace shoplify_backend.Seeders;

public class CategorySeeder : ISeeder
{
    public bool Seed(ShoplifyContext context)
    {
        try
        {
            var categories = new Category[]
            {
                new() { Name = "Laptops & Computers" },
                new() { Name = "Mobiles & Gadgets" },
                new() { Name = "Men's Apparel" },
                new() { Name = "Women's Apparel" },
                new() { Name = "Mobile Accessories" },
                new() { Name = "Appliances" },
                new() { Name = "Tools" },
            };
            context.Category.AddRange(categories);
            context.SaveChanges();
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error:{ex}");
            return false;
        }
    }
}
