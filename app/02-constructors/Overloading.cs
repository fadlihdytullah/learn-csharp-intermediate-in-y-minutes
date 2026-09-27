var guest = new Customer();
var known = new Customer(1);
var full = new Customer(2, "John");

full.Orders.Add(new Order());

Console.WriteLine($"{guest.Id} {guest.Name} {guest.Orders.Count}");
Console.WriteLine($"{known.Id} {known.Name} {known.Orders.Count}");
Console.WriteLine($"{full.Id} {full.Name} {full.Orders.Count}");

class Customer
{
    public int Id;
    public string Name;
    public List<Order> Orders;

    public Customer()
    {
        Name = "Guest";
        Orders = [];
    }

    public Customer(int id) : this()
    {
        Id = id;
    }

    public Customer(int id, string name) : this(id)
    {
        Name = name;
    }
}

class Order { }
