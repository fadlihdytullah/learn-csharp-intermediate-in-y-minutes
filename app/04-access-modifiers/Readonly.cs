var customer = new Customer(1);
customer.Orders.Add("Book");
customer.Orders.Add("Pen");

Console.WriteLine($"Customer {customer.Id} has {customer.Orders.Count} orders.");
Console.WriteLine($"Limit: {Customer.MaxOrders}");

class Customer
{
    public const int MaxOrders = 10;
    public readonly int Id;
    public readonly List<string> Orders = [];

    public Customer(int id)
    {
        Id = id;
    }
}
