using shoplify_backend.EndPoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddValidation();

var app = builder.Build();

app.MapItemsEndPoint();

app.Run();
