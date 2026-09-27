#:package Microsoft.Extensions.DependencyInjection@10.0.0

using Microsoft.Extensions.DependencyInjection;

var services = new ServiceCollection();
services.AddSingleton<IShippingCalculator, ShippingCalculator>();
services.AddTransient<OrderProcessor>();

var provider = services.BuildServiceProvider();

var processor = provider.GetRequiredService<OrderProcessor>();
processor.Process(20);
processor.Process(80);

interface IShippingCalculator
{
    decimal Calculate(decimal totalPrice);
}

class ShippingCalculator : IShippingCalculator
{
    public decimal Calculate(decimal totalPrice) => totalPrice < 30 ? 2.5m : 0;
}

class OrderProcessor(IShippingCalculator calculator)
{
    public void Process(decimal totalPrice) =>
        Console.WriteLine($"Order of {totalPrice}: shipping {calculator.Calculate(totalPrice)}");
}
