using Microsoft.AspNetCore.StaticAssets;
using shoplify_backend.Data;

namespace shoplify_backend.Seeders;

public static class DBMasterSeeder
{
    public static void RunSeeders(ShoplifyContext context, string? targetSeeder)
    {
        var seederTypes = typeof(ISeeder)
            .Assembly.GetTypes()
            .Where(t => typeof(ISeeder).IsAssignableFrom(t) && !t.IsInterface && !t.IsAbstract);

        if (!string.IsNullOrEmpty(targetSeeder))
        {
            seederTypes = seederTypes.Where(t =>
                t.Name.Equals(targetSeeder, StringComparison.OrdinalIgnoreCase)
            );

            if (!seederTypes.Any())
            {
                Console.WriteLine($"[!] No seeder found with the name: {targetSeeder}");
                return;
            }
        }

        foreach (var type in seederTypes)
        {
            var seeder = (ISeeder)Activator.CreateInstance(type)!;
            seeder.Seed(context);
            Console.WriteLine($"[✓] Executed Seeder: {type.Name}");
        }
    }
}
