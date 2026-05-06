using System;
using Microsoft.AspNetCore.Identity;

namespace shoplify_backend.Models;

public class Users : IdentityUser
{
    public required string First_Name { get; set; }
    public string? Middle_Name { get; set; }
    public required string Last_Name { get; set; }
}
