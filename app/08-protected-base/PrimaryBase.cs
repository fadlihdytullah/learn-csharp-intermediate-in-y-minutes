var truck = new Truck("TRK-42", 18);
Console.WriteLine($"{truck.RegistrationNumber} carries {truck.CapacityTons} tons.");

class Vehicle(string registrationNumber)
{
    public string RegistrationNumber { get; } = registrationNumber;
}

class Truck(string registrationNumber, int capacityTons) : Vehicle(registrationNumber)
{
    public int CapacityTons { get; } = capacityTons;
}
