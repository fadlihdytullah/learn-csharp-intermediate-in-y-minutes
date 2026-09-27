using System.Collections;

int number = 10;
object boxed = number;
number = 20;

Console.WriteLine($"number = {number}, boxed = {boxed}");

int unboxed = (int)boxed;
Console.WriteLine(unboxed);

var list = new ArrayList { 1, "two", 3.5 };
foreach (var item in list)
    Console.WriteLine(item.GetType().Name);

List<int> numbers = [1, 2, 3];
Console.WriteLine(numbers.Sum());
