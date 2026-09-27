List<Product> products =
[
    new("Keyboard", "Accessories", 49),
    new("Mouse", "Accessories", 19),
    new("Monitor", "Displays", 199),
    new("Laptop", "Computers", 1299),
    new("Webcam", "Accessories", 59),
];

var cheap = products
    .Where(p => p.Price < 100)
    .OrderBy(p => p.Price)
    .Select(p => $"{p.Name} ({p.Price})");
Console.WriteLine(string.Join(", ", cheap));

Console.WriteLine(products.First(p => p.Category == "Displays").Name);
Console.WriteLine(products.FirstOrDefault(p => p.Category == "Phones")?.Name ?? "none");
Console.WriteLine(products.Single(p => p.Name == "Laptop").Price);

Console.WriteLine(products.Any(p => p.Price > 1000));
Console.WriteLine(products.Count(p => p.Category == "Accessories"));
Console.WriteLine(products.Sum(p => p.Price));
Console.WriteLine(products.Max(p => p.Price));

record Product(string Name, string Category, decimal Price);
