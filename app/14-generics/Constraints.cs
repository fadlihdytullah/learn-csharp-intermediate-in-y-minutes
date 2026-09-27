var repo = new Repository<Product>();
repo.Add(new Product { Id = 1, Name = "Keyboard" });
repo.Add(new Product { Id = 2, Name = "Mouse" });

Console.WriteLine(repo.GetById(2)?.Name ?? "not found");
Console.WriteLine(repo.GetById(9)?.Name ?? "not found");

var blank = Factory.Create<Product>();
Console.WriteLine($"New product has id {blank.Id}");

interface IEntity
{
    int Id { get; }
}

class Product : IEntity
{
    public int Id { get; init; }
    public string Name { get; init; } = "";
}

class Repository<T> where T : class, IEntity
{
    private readonly List<T> items = [];

    public void Add(T item) => items.Add(item);

    public T? GetById(int id) => items.Find(item => item.Id == id);
}

static class Factory
{
    public static T Create<T>() where T : new() => new T();
}
