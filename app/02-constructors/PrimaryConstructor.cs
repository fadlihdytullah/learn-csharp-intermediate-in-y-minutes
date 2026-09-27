var logger = new ConsoleLogger("orders");
var service = new OrderService(logger);

service.PlaceOrder(42);
service.PlaceOrder(43);

class ConsoleLogger(string category)
{
    public void Log(string message)
    {
        Console.WriteLine($"[{category}] {message}");
    }
}

class OrderService(ConsoleLogger logger)
{
    public void PlaceOrder(int id)
    {
        logger.Log($"Order {id} placed.");
    }
}
