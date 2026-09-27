var stock = new Dictionary<string, int>
{
    ["keyboard"] = 12,
    ["mouse"] = 40,
};

stock["monitor"] = 5;
stock["mouse"] -= 3;

Console.WriteLine($"Mice left: {stock["mouse"]}");
Console.WriteLine($"Has webcam? {stock.ContainsKey("webcam")}");

if (stock.TryGetValue("monitor", out var monitors))
{
    Console.WriteLine($"Monitors: {monitors}");
}

foreach (var (item, quantity) in stock)
{
    Console.WriteLine($"{item,-10}{quantity,3}");
}
