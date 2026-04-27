using shoplify_backend.Data;

namespace shoplify_backend.Seeders;

public interface ISeeder
{
    bool Seed(ShoplifyContext context);
}
