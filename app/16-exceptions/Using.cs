try
{
    using var connection = new Connection("orders-db");
    connection.Query("SELECT * FROM Orders");
    throw new TimeoutException("The query took too long.");
}
catch (TimeoutException ex)
{
    Console.WriteLine($"Error: {ex.Message}");
}

class Connection : IDisposable
{
    private readonly string name;

    public Connection(string name)
    {
        this.name = name;
        Console.WriteLine($"Opened {name}");
    }

    public void Query(string sql) => Console.WriteLine($"Running: {sql}");

    public void Dispose() => Console.WriteLine($"Closed {name}");
}
