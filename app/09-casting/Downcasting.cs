Shape shape = new Text { FontSize = 14 };
var text = (Text)shape;
Console.WriteLine(text.FontSize);

Shape circle = new Circle();
try
{
    _ = (Text)circle;
}
catch (InvalidCastException ex)
{
    Console.WriteLine(ex.Message);
}

class Shape { }

class Text : Shape
{
    public int FontSize { get; set; }
}

class Circle : Shape { }
