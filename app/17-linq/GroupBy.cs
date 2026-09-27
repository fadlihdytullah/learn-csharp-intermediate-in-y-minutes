List<Product> products =
[
    new("Keyboard", "Accessories", 49),
    new("Mouse", "Accessories", 19),
    new("Monitor", "Displays", 199),
    new("Laptop", "Computers", 1299),
    new("Webcam", "Accessories", 59),
];

var byCategory = products
    .GroupBy(p => p.Category)
    .Select(g => new { Category = g.Key, Count = g.Count(), Total = g.Sum(p => p.Price) })
    .OrderByDescending(x => x.Total);

foreach (var group in byCategory)
{
    Console.WriteLine($"{group.Category,-12} {group.Count} items  total {group.Total}");
}

record Product(string Name, string Category, decimal Price);
