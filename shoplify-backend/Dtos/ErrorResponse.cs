using System;

namespace shoplify_backend.Dtos;

public class ErrorResponse
{
    public bool Success { get; set; } = false;
    public int Status { get; set; }
    public string Message { get; set; } = string.Empty;

    public IDictionary<string, string[]>? Errors { get; set; }
}
