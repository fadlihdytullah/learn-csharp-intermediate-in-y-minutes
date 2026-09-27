var john = new Person();
john.Name = "John";

var mary = new Person();
mary.Name = "Mary";

john.Name = "Johnny";

Console.WriteLine(john.Name);
Console.WriteLine(mary.Name);

class Person
{
    public string Name = "";
}
