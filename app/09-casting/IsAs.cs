Shape[] shapes = [new Text { FontSize = 14 }, new Circle { Radius = 5 }];

foreach (var shape in shapes)
{
    if (shape is Text t)
        Console.WriteLine($"Text with font size {t.FontSize}");
    else if (shape is Circle c)
        Console.WriteLine($"Circle with radius {c.Radius}");
}

var maybeText = shapes[1] as Text;
Console.WriteLine(maybeText is null ? "as returned null" : "It is a Text");

class Shape { }

class Text : Shape
{
    public int FontSize { get; set; }
}

class Circle : Shape
{
    public int Radius { get; set; }
}
