using shoplify_backend.Data;

namespace shoplify_backend.Interfaces;

public interface ISeeder
{
    bool Seed(ShoplifyContext context);
}
