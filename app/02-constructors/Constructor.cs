var customer = new Customer(1, "John");

Console.WriteLine($"{customer.Id}: {customer.Name}");

class Customer
{
    public int Id;
    public string Name;

    public Customer(int id, string name)
    {
        Id = id;
        Name = name;
    }
}
