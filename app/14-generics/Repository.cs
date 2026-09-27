var products = new Repository<Product>();
products.Add(new Product("Keyboard"));
products.Add(new Product("Mouse"));

var customers = new Repository<Customer>();
customers.Add(new Customer("Ada", "ada@example.com"));

Console.WriteLine($"{products.Count} products, {customers.Count} customer");

foreach (var product in products.GetAll())
{
    Console.WriteLine(product.Name);
}

class Repository<T>
{
    private readonly List<T> items = [];

    public int Count => items.Count;

    public void Add(T item) => items.Add(item);

    public IReadOnlyList<T> GetAll() => items;
}

record Product(string Name);

record Customer(string Name, string Email);
