namespace shoplify_backend.Dtos;

public record class RegisterDto(
    string First_name,
    string Middle_name,
    string Last_name,
    string Email,
    string Password
);
