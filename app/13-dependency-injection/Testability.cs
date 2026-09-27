var processor = new OrderProcessor(new FakeShippingCalculator());

var order = new Order { TotalPrice = 100 };
processor.Process(order);
Console.WriteLine(order.ShippingCost == 1 ? "PASS  sets the shipping cost" : "FAIL  sets the shipping cost");

try
{
    processor.Process(order);
    Console.WriteLine("FAIL  rejects an order that already shipped");
}
catch (InvalidOperationException)
{
    Console.WriteLine("PASS  rejects an order that already shipped");
}

interface IShippingCalculator
{
    decimal Calculate(Order order);
}

class ShippingCalculator : IShippingCalculator
{
    public decimal Calculate(Order order) => order.TotalPrice < 30 ? order.TotalPrice * 0.1m : 0;
}

class FakeShippingCalculator : IShippingCalculator
{
    public decimal Calculate(Order order) => 1;
}

class OrderProcessor(IShippingCalculator calculator)
{
    public void Process(Order order)
    {
        if (order.IsShipped)
            throw new InvalidOperationException("This order has already shipped.");

        order.ShippingCost = calculator.Calculate(order);
        order.IsShipped = true;
    }
}

class Order
{
    public decimal TotalPrice { get; init; }
    public decimal ShippingCost { get; set; }
    public bool IsShipped { get; set; }
}
