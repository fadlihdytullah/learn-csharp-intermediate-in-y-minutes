Shape shape = new Circle();
shape.Draw();

class Shape
{
    public virtual void Draw()
    {
        Console.WriteLine("Preparing the canvas");
    }
}

class Circle : Shape
{
    public override void Draw()
    {
        base.Draw();
        Console.WriteLine("Drawing a circle");
    }
}
