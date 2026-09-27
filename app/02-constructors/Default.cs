var customer = new Customer();

Console.WriteLine(customer.Id);
Console.WriteLine(customer.Name ?? "(null)");

customer.Id = 1;
customer.Name = "John";
Console.WriteLine($"{customer.Id}: {customer.Name}");

class Customer
{
    public int Id;
    public string? Name;
}
