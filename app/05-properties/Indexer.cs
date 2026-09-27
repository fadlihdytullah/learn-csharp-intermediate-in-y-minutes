var cookie = new HttpCookie();
cookie["name"] = "Ada";
cookie["theme"] = "dark";

Console.WriteLine(cookie["name"]);
Console.WriteLine(cookie["theme"]);
Console.WriteLine($"[{cookie["missing"]}]");

class HttpCookie
{
    private readonly Dictionary<string, string> _values = [];

    public string this[string key]
    {
        get => _values.GetValueOrDefault(key, "");
        set => _values[key] = value;
    }
}
