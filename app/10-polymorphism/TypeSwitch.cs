List<Shape> shapes = [new Shape { Type = ShapeType.Circle }, new Shape { Type = ShapeType.Rectangle }];

foreach (var shape in shapes)
{
    switch (shape.Type)
    {
        case ShapeType.Circle:
            Console.WriteLine("Drawing a circle");
            break;
        case ShapeType.Rectangle:
            Console.WriteLine("Drawing a rectangle");
            break;
    }
}

enum ShapeType { Circle, Rectangle }

class Shape
{
    public ShapeType Type { get; set; }
}
