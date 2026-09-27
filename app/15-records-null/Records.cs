var a = new ProductRecord("Keyboard", 49.99m);
var b = new ProductRecord("Keyboard", 49.99m);
Console.WriteLine(a);
Console.WriteLine($"records equal: {a == b}");

var c = new ProductClass("Keyboard", 49.99m);
var d = new ProductClass("Keyboard", 49.99m);
Console.WriteLine(c);
Console.WriteLine($"classes equal: {c == d}");

record ProductRecord(string Name, decimal Price);

class ProductClass(string name, decimal price)
{
    public string Name => name;
    public decimal Price => price;
}
