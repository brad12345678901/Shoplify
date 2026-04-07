using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using shoplify_backend.Data;

public class ShoplifyContextFactory : IDesignTimeDbContextFactory<ShoplifyContext>
{
    public ShoplifyContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<ShoplifyContext>();

        optionsBuilder.UseNpgsql(
            "Host=localhost;Port=5632;Database=shoplify-db;Username=postgres;Password=root"
        );

        return new ShoplifyContext(optionsBuilder.Options);
    }
}
