var person = new Person { Birthdate = new DateOnly(1990, 11, 3) };

Console.WriteLine($"Age: {person.Age}");

class Person
{
    private static readonly DateOnly Today = new(2026, 9, 28);

    public DateOnly Birthdate { get; init; }

    public int Age
    {
        get
        {
            var age = Today.Year - Birthdate.Year;
            if (Birthdate > Today.AddYears(-age))
                age--;
            return age;
        }
    }
}
