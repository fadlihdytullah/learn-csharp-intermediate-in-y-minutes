#:sdk Microsoft.NET.Sdk.Web
#:property PublishAot=false

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<IProductStore, InMemoryProductStore>();

var app = builder.Build();

app.MapGet("/products", async (IProductStore store) =>
    await store.GetAllAsync());

app.MapGet("/products/{id:int}", async (int id, IProductStore store) =>
{
    var product = await store.GetAsync(id);
    return product is null ? Results.NotFound() : Results.Ok(product);
});

app.MapPost("/products", async (CreateProductRequest request, IProductStore store) =>
{
    var product = await store.AddAsync(request);
    return Results.Created($"/products/{product.Id}", product);
});

app.Run();

record Product(int Id, string Name, decimal Price);

record CreateProductRequest(string Name, decimal Price);

interface IProductStore
{
    Task<List<Product>> GetAllAsync();
    Task<Product?> GetAsync(int id);
    Task<Product> AddAsync(CreateProductRequest request);
}

class InMemoryProductStore : IProductStore
{
    private readonly List<Product> products = [new(1, "Keyboard", 49.99m), new(2, "Mouse", 19.99m)];

    public Task<List<Product>> GetAllAsync() =>
        Task.FromResult(products.OrderBy(p => p.Name).ToList());

    public Task<Product?> GetAsync(int id) =>
        Task.FromResult(products.FirstOrDefault(p => p.Id == id));

    public Task<Product> AddAsync(CreateProductRequest request)
    {
        var product = new Product(products.Max(p => p.Id) + 1, request.Name, request.Price);
        products.Add(product);
        return Task.FromResult(product);
    }
}
