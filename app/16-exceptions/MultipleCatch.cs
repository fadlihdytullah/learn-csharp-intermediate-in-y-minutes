string[] inputs = ["4", "abc", "99999999999", "0"];

foreach (var input in inputs)
{
    try
    {
        var number = int.Parse(input);
        Console.WriteLine($"OK       100 / {number} = {100 / number}");
    }
    catch (FormatException)
    {
        Console.WriteLine($"Format   \"{input}\" is not a number");
    }
    catch (OverflowException)
    {
        Console.WriteLine($"Overflow {input} does not fit in an int");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Other    {ex.GetType().Name}: {ex.Message}");
    }
}
