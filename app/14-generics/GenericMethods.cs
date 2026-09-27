Console.WriteLine(Max(3, 7));
Console.WriteLine(Max("apple", "banana"));

var first = "left";
var second = "right";
Swap(ref first, ref second);
Console.WriteLine($"{first} {second}");

Console.WriteLine(Max<double>(2, 2.5));

static T Max<T>(T a, T b) where T : IComparable<T> =>
    a.CompareTo(b) >= 0 ? a : b;

static void Swap<T>(ref T a, ref T b) => (a, b) = (b, a);
