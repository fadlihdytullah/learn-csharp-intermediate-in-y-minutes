List<Shape> shapes = [new Circle(2), new Rectangle(3, 4)];

foreach (var shape in shapes)
{
    shape.Describe();
}

abstract class Shape
{
    public abstract double Area();

    public abstract void Draw();

    public void Describe()
    {
        Draw();
        Console.WriteLine($"  area = {Area():F2}");
    }
}

class Circle(double radius) : Shape
{
    public override double Area() => Math.PI * radius * radius;

    public override void Draw() => Console.WriteLine($"Drawing a circle, radius {radius}");
}

class Rectangle(double width, double height) : Shape
{
    public override double Area() => width * height;

    public override void Draw() => Console.WriteLine($"Drawing a {width}x{height} rectangle");
}
