using shoplify_backend.Dtos;

namespace shoplify_backend.EndPoints;

public static class ItemsEndpoints
{
    const string GetItemEndpointName = "GetItem";
    private static readonly List<ItemDto> items =
    [
        new(
            1,
            "Acer",
            "Computer",
            "Acer PC, 5060 RTX, 32GB RAM 5000MHZ",
            101999.99M,
            10,
            new DateOnly()
        ),
        new(
            2,
            "Asus",
            "Laptop",
            "Asus Laptop, 9060 XT, 16GB RAM 5000MHZ",
            89999.99M,
            10,
            new DateOnly()
        ),
        new(
            3,
            "MSI",
            "Computer",
            "MSI Laptop, 4080 RTX, 32GB RAM 4000MHZ",
            69999.99M,
            10,
            new DateOnly()
        ),
    ];

    public static void MapItemsEndPoint(this WebApplication app)
    {
        var group = app.MapGroup("/items");

        //GET All Items
        group.MapGet("/", () => items);

        //GET Specific Item
        group
            .MapGet(
                "/{id}",
                (int id) =>
                {
                    var item = items.Find(item => item.Id == id);

                    return item is null ? Results.NotFound() : Results.Ok(item);
                }
            )
            .WithName(GetItemEndpointName);

        //Create Item
        group.MapPost(
            "/",
            (CreateItemDto createItem) =>
            {
                DateOnly today = DateOnly.FromDateTime(DateTime.UtcNow);
                ItemDto item = new(
                    items.Count + 1,
                    createItem.Name,
                    createItem.Type,
                    createItem.Description,
                    createItem.Price,
                    createItem.Stock,
                    today
                );
                items.Add(item);
                return Results.CreatedAtRoute(GetItemEndpointName, new { id = item.Id }, item);
            }
        );

        //Update Function
        group.MapPut(
            "/{id}",
            (int id, UpdateItemDto updateItem) =>
            {
                var index = items.FindIndex(item => item.Id == id);

                if (index == -1)
                {
                    return Results.NotFound();
                }

                DateOnly today = DateOnly.FromDateTime(DateTime.UtcNow);
                items[index] = new ItemDto(
                    id,
                    updateItem.Name,
                    updateItem.Type,
                    updateItem.Description,
                    updateItem.Price,
                    updateItem.Stock,
                    today
                );

                return Results.NoContent();
            }
        );

        //DELETE Function
        group.MapDelete(
            "/{id}",
            (int id) =>
            {
                items.RemoveAll(item => item.Id == id);

                return Results.NoContent();
            }
        );
    }
}
