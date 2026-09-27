var text = new Text { Width = 100, Height = 20, FontSize = 12 };
text.Copy();
text.AddHyperlink("https://example.com");
Console.WriteLine($"{text.Width}x{text.Height}, {text.FontName} {text.FontSize}pt");

var table = new Table { Width = 400, Height = 300, Rows = 3 };
table.Copy();
Console.WriteLine($"{table.Width}x{table.Height}, {table.Rows} rows");

class PresentationObject
{
    public int Width { get; set; }
    public int Height { get; set; }

    public void Copy()
    {
        Console.WriteLine($"{GetType().Name} copied to clipboard.");
    }
}

class Text : PresentationObject
{
    public int FontSize { get; set; }
    public string FontName { get; set; } = "Arial";

    public void AddHyperlink(string url)
    {
        Console.WriteLine($"Link added to {url}");
    }
}

class Table : PresentationObject
{
    public int Rows { get; set; }
}
