var text = new Text { Width = 200, FontSize = 14 };
Shape shape = text;

shape.Width = 300;

Console.WriteLine(text.Width);
Console.WriteLine(ReferenceEquals(text, shape));

class Shape
{
    public int Width { get; set; }
}

class Text : Shape
{
    public int FontSize { get; set; }
}
