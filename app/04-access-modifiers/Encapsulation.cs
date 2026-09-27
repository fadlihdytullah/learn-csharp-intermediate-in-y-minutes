var person = new Person();
person.SetBirthdate(new DateOnly(1990, 5, 17));
Console.WriteLine($"Born {person.GetBirthdate():yyyy-MM-dd}");

try
{
    person.SetBirthdate(new DateOnly(2090, 1, 1));
}
catch (ArgumentException ex)
{
    Console.WriteLine(ex.Message);
}

Console.WriteLine($"Still {person.GetBirthdate():yyyy-MM-dd}");

class Person
{
    private static readonly DateOnly Today = new(2026, 9, 28);
    private DateOnly _birthdate;

    public void SetBirthdate(DateOnly birthdate)
    {
        if (birthdate > Today)
            throw new ArgumentException("Birthdate cannot be in the future.");
        _birthdate = birthdate;
    }

    public DateOnly GetBirthdate()
    {
        return _birthdate;
    }
}
