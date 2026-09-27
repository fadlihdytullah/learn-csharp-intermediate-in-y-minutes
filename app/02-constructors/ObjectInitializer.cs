var ada = new Person { FirstName = "Ada", LastName = "Lovelace" };
var linus = new Person { FirstName = "Linus" };

Console.WriteLine($"{ada.FirstName} {ada.LastName}");
Console.WriteLine($"{linus.FirstName} {linus.LastName}".Trim());

class Person
{
    public string FirstName = "";
    public string LastName = "";
}
