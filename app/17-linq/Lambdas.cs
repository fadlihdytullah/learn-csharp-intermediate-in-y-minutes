Func<int, int> square = x => x * x;
Func<int, int, int> add = (a, b) => a + b;
Action<string> greet = name => Console.WriteLine($"Hello, {name}!");
Func<int, bool> isEven = n => n % 2 == 0;

Console.WriteLine(square(5));
Console.WriteLine(add(2, 3));
greet("Ada");
Console.WriteLine(isEven(7));

int[] numbers = [1, 2, 3, 4];
Console.WriteLine(string.Join(", ", Apply(numbers, x => x * 10)));
Console.WriteLine(string.Join(", ", Apply(numbers, square)));

static List<int> Apply(int[] values, Func<int, int> transform)
{
    var result = new List<int>();
    foreach (var value in values)
        result.Add(transform(value));
    return result;
}
