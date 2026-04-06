var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapGet("/", () => new
{
    Message = "Hello World!",
    Status = "Success",
    Timestamp = DateTime.Now
});

app.Run();
