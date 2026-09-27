Console.WriteLine("Requesting the user...");
var user = await GetUserAsync(42);
Console.WriteLine($"Got {user}");

Task<string> pending = GetUserAsync(7);
Console.WriteLine("Doing other work while we wait...");
Console.WriteLine($"Got {await pending}");

static async Task<string> GetUserAsync(int id)
{
    await Task.Delay(500);
    return $"user #{id}";
}
