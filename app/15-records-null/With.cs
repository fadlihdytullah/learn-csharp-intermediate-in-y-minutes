var original = new Product("Keyboard", 49.99m);
var discounted = original with { Price = 39.99m };

Console.WriteLine(original);
Console.WriteLine(discounted);

var (name, price) = discounted;
Console.WriteLine($"{name} costs {price}");

var p1 = new Point(1, 2);
var p2 = p1 with { Y = 5 };
Console.WriteLine($"{p1} {p2}");

record Product(string Name, decimal Price);

record struct Point(int X, int Y);
