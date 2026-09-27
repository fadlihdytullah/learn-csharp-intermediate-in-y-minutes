var car = new Car();

class Vehicle
{
    public Vehicle()
    {
        Console.WriteLine("1. Vehicle constructor");
    }
}

class Car : Vehicle
{
    public Car()
    {
        Console.WriteLine("2. Car constructor");
    }
}
