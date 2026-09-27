using System.Collections;

var list = new ArrayList();
list.Add(10);
list.Add(20);
list.Add("thirty");

var sum = 0;
foreach (var item in list)
{
    try
    {
        sum += (int)item;
    }
    catch (InvalidCastException)
    {
        Console.WriteLine($"Crash at runtime: \"{item}\" is not an int");
    }
}
Console.WriteLine($"Sum: {sum}");
