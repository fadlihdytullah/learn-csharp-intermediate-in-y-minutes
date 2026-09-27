var items = Enumerable.Range(1, 23).Select(i => $"Item {i}").ToList();
const int pageSize = 10;

for (var page = 1; page <= 3; page++)
{
    var pageItems = items
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .ToList();

    Console.WriteLine($"Page {page}: {pageItems.First()} .. {pageItems.Last()} ({pageItems.Count} items)");
}
