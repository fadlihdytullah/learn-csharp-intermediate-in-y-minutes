List<int> numbers = [1, 2, 3];

var query = numbers.Where(n => n > 1);
var snapshot = numbers.Where(n => n > 1).ToList();

numbers.Add(4);

Console.WriteLine($"query:    {string.Join(", ", query)}");
Console.WriteLine($"snapshot: {string.Join(", ", snapshot)}");
