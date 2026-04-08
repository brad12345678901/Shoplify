using Microsoft.AspNetCore.StaticAssets;
using shoplify_backend.Data;

namespace shoplify_backend.Seeders;

public static class DBMasterSeeder
{
    public static async Task RunSeeders(ShoplifyContext context, string? targetSeeder)
    {
        var seederTypes = typeof(ISeeder)
            .Assembly.GetTypes()
            .Where(t => typeof(ISeeder).IsAssignableFrom(t) && !t.IsInterface && !t.IsAbstract);

        if (!await context.Database.CanConnectAsync())
        {
            Console.WriteLine(
                $"[!] Cannot connect to the Database! Seeding Operation is aborted..."
            );
            return;
        }

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
            var success = seeder.Seed(context);
            var message = success
                ? $"[✓] Executed Seeder: {type.Name}"
                : $"[X] Fail to execute Seeder: {type.Name}";
            Console.WriteLine(message);
        }
    }
}
