var person = new Person();
person.Name = "John";
person.Introduce("Mosh");

class Person
{
    public string Name = "";

    public void Introduce(string to)
    {
        Console.WriteLine($"Hi {to}, I am {Name}.");
    }
}
