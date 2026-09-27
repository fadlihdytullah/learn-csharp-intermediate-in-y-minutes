var plain = new Plain();
var product = new Product("Keyboard", 12);

Console.WriteLine(plain);
Console.WriteLine(product);
Console.WriteLine($"In cart: {product}");

class Plain { }

class Product(string name, int stock)
{
    public override string ToString() => $"{name} ({stock} in stock)";
}
