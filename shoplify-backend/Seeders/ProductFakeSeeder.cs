using System.Data.SqlTypes;
using Bogus;
using shoplify_backend.Data;
using shoplify_backend.Interfaces;
using shoplify_backend.Models;

namespace shoplify_backend.Seeders;

public class ProductFakeSeeder : ISeeder
{
    public bool Seed(ShoplifyContext context)
    {
        try
        {
            if (!context.Category.Any())
            {
                Console.WriteLine("NO CATEGORIES");
                return false;
            }

            var categories = context.Category.ToList();

            var faker = new Faker<Products>()
                .RuleFor(p => p.Name, f => f.Commerce.ProductName())
                .RuleFor(p => p.Description, f => f.Commerce.ProductAdjective())
                .RuleFor(p => p.Type, f => f.Commerce.ProductMaterial())
                .RuleFor(p => p.Price, f => decimal.Parse(f.Commerce.Price()))
                .RuleFor(p => p.Stock, f => f.Random.Int(1, 100))
                .RuleFor(p => p.CategoryId, f => f.PickRandom(categories).Id);
            var fakeproducts = faker.Generate(30);
            context.Products.AddRange(fakeproducts);
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
