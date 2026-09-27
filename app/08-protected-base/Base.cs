var car = new Car("XYZ-1234");
Console.WriteLine(car.RegistrationNumber);

class Vehicle
{
    public string RegistrationNumber { get; }

    public Vehicle(string registrationNumber)
    {
        RegistrationNumber = registrationNumber;
        Console.WriteLine($"Vehicle {registrationNumber} initialized.");
    }
}

class Car : Vehicle
{
    public Car(string registrationNumber) : base(registrationNumber)
    {
        Console.WriteLine("Car initialized.");
    }
}
