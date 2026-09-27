using System.Diagnostics;

var watch = Stopwatch.StartNew();
await FetchAsync("orders");
await FetchAsync("customers");
await FetchAsync("products");
Console.WriteLine($"One after another: {watch.Elapsed.TotalSeconds:F1}s");

watch.Restart();
string[] results = await Task.WhenAll(
    FetchAsync("orders"),
    FetchAsync("customers"),
    FetchAsync("products"));
Console.WriteLine($"All at once:       {watch.Elapsed.TotalSeconds:F1}s");
Console.WriteLine(string.Join(", ", results));

static async Task<string> FetchAsync(string name)
{
    await Task.Delay(500);
    return $"{name} loaded";
}
