var admin = new SuperAdmin("Grace");
Console.WriteLine(admin.Greeting());

var token = new ApiToken("abc123");
Console.WriteLine(token.Value);

class User(string name)
{
    public string Name => name;

    public virtual string Greeting() => $"Hello, {Name}";
}

class Admin(string name) : User(name)
{
    public sealed override string Greeting() => $"Hello, {Name} (admin)";
}

class SuperAdmin(string name) : Admin(name)
{
}

sealed class ApiToken(string value)
{
    public string Value => value;
}
