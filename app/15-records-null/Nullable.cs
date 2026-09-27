var ada = new Person("Ada", null);
var alan = new Person("Alan", "Mathison");

Console.WriteLine($"Ada:  [{ada.MiddleName?.Length}]");
Console.WriteLine($"Alan: [{alan.MiddleName?.Length}]");

Console.WriteLine(ada.MiddleName ?? "(no middle name)");

string? nickname = null;
nickname ??= "Countess";
Console.WriteLine(nickname);

foreach (var person in new[] { ada, alan })
{
    if (person.MiddleName is null)
        Console.WriteLine($"{person.FirstName} has no middle name");
    else
        Console.WriteLine($"{person.FirstName}'s middle name has {person.MiddleName.Length} letters");
}

record Person(string FirstName, string? MiddleName);
