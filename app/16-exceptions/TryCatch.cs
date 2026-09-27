Console.WriteLine("Start");

try
{
    var quantity = int.Parse("five");
    Console.WriteLine($"Quantity: {quantity}");
}
catch (FormatException ex)
{
    Console.WriteLine($"Caught: {ex.Message}");
}
finally
{
    Console.WriteLine("finally always runs");
}

Console.WriteLine("The program keeps going");
