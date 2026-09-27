var ada = Person.Create("Ada");
var linus = Person.Create("Linus");

ada.Introduce("Linus");
linus.Introduce("Ada");

Console.WriteLine($"People created: {Person.Count}");

class Person
{
    public static int Count;
    public string Name = "";

    public static Person Create(string name)
    {
        Count++;
        var person = new Person();
        person.Name = name;
        return person;
    }

    public void Introduce(string to)
    {
        Console.WriteLine($"Hi {to}, I am {Name}.");
    }
}
