using Microsoft.AspNetCore.Diagnostics;
using shoplify_backend.Dtos;

namespace shoplify_backend.Exceptions;

public class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
{
    private readonly ILogger<GlobalExceptionHandler> _logger = logger;

    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken
    )
    {
        _logger.LogError(exception, "Exception occurred: {Message}", exception.Message);

        var (statusCode, message) = exception switch
        {
            ShoplifyException ex => ((int)ex.StatusCode, ex.Message),
            KeyNotFoundException => (StatusCodes.Status404NotFound, "Resource not found"),
            UnauthorizedAccessException => (StatusCodes.Status401Unauthorized, "Access denied"),
            _ => (StatusCodes.Status500InternalServerError, "An unexpected error occurred"),
        };

        httpContext.Response.StatusCode = statusCode;

        await httpContext.Response.WriteAsJsonAsync(
            new ErrorResponse { Status = statusCode, Message = message },
            cancellationToken
        );

        return true;
    }
}
