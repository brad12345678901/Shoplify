using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using shoplify_backend.Models;

namespace shoplify_backend.Data;

//DB CONTEXT -> in a entity framework core represents the session between your API and the database
//Where you can do query operations onto the database
public class ShoplifyContext(DbContextOptions<ShoplifyContext> options)
    : IdentityDbContext<Users>(options)
{
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Users>(entity =>
        {
            entity.ToTable("Users");
        });

        builder.Entity<IdentityRole>(entity =>
        {
            entity.ToTable("Roles");
        });

        builder.Entity<IdentityUserRole<string>>(entity =>
        {
            entity.ToTable("UserRoles");
        });
    }


    public DbSet<Products> Products => Set<Products>();

    public DbSet<Category> Category => Set<Category>();

    public DbSet<ProductImage> ProductImage => Set<ProductImage>();
}
