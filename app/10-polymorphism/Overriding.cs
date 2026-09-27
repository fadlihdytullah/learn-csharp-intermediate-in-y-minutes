List<Shape> shapes = [new Circle(), new Rectangle(), new Triangle()];

var canvas = new Canvas();
canvas.DrawShapes(shapes);

class Canvas
{
    public void DrawShapes(List<Shape> shapes)
    {
        foreach (var shape in shapes)
            shape.Draw();
    }
}

class Shape
{
    public virtual void Draw() => Console.WriteLine("Drawing a shape");
}

class Circle : Shape
{
    public override void Draw() => Console.WriteLine("Drawing a circle");
}

class Rectangle : Shape
{
    public override void Draw() => Console.WriteLine("Drawing a rectangle");
}

class Triangle : Shape { }
