var customer = new Customer { Id = 1, Name = "Ada" };
customer.Name = "Ada Lovelace";
customer.AddPoints(50);
customer.AddPoints(25);

Console.WriteLine($"{customer.Id}: {customer.Name}, {customer.Points} points");

class Customer
{
    public required int Id { get; init; }
    public required string Name { get; set; }
    public int Points { get; private set; }

    public void AddPoints(int amount)
    {
        Points += amount;
    }
}
