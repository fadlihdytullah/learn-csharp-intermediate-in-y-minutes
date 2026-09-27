var score = 10;
Double(ref score);
Console.WriteLine(score);

if (int.TryParse("42", out var number))
    Console.WriteLine($"Parsed {number}");

if (!int.TryParse("abc", out _))
    Console.WriteLine("abc is not a number");

if (TryFindUser(1, out var name))
    Console.WriteLine($"Found {name}");

if (!TryFindUser(99, out _))
    Console.WriteLine("User 99 not found");

static void Double(ref int value)
{
    value *= 2;
}

static bool TryFindUser(int id, out string name)
{
    name = id == 1 ? "Ada" : "";
    return id == 1;
}
