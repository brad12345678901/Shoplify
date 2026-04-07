using Microsoft.EntityFrameworkCore;
using shoplify_backend.Models;

namespace shoplify_backend.Data;

//DB CONTEXT -> in a entity framework core represents the session between your API and the database
//Where you can do query operations onto the database
public class ShoplifyContext(DbContextOptions<ShoplifyContext> options) : DbContext(options)
{
    public DbSet<Item> Items => Set<Item>();

    public DbSet<Category> Category => Set<Category>();
}
