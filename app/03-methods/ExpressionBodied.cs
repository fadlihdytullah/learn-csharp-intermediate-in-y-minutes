Console.WriteLine(Square(5));

var stats = GetStats([3, 9, 4]);
Console.WriteLine($"Min {stats.Min}, Max {stats.Max}");

var (min, max) = GetStats([10, 2, 7]);
Console.WriteLine($"Min {min}, Max {max}");

static int Square(int x) => x * x;

static (int Min, int Max) GetStats(int[] numbers) => (numbers.Min(), numbers.Max());
