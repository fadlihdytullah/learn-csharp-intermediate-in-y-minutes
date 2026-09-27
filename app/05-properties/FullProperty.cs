var person = new Person();
person.Name = "   Ada   ";

Console.WriteLine($"[{person.Name}]");

class Person
{
    private string _name = "";

    public string Name
    {
        get { return _name; }
        set { _name = value.Trim(); }
    }
}
