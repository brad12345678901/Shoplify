using shoplify_backend.Dtos;
using shoplify_backend.EndPoints;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapItemsEndPoint();

app.Run();
