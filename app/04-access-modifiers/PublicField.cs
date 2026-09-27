var person = new Person();
person.Birthdate = new DateOnly(2090, 1, 1);

Console.WriteLine($"Born {person.Birthdate:yyyy-MM-dd}. That is in the future!");

class Person
{
    public DateOnly Birthdate;
}
