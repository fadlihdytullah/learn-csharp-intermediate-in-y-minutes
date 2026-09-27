var point = new Point(10, 20);

point.Move(100, 200);
Console.WriteLine($"({point.X}, {point.Y})");

point.Move(new Point(40, 60));
Console.WriteLine($"({point.X}, {point.Y})");

class Point(int x, int y)
{
    public int X = x;
    public int Y = y;

    public void Move(int x, int y)
    {
        X = x;
        Y = y;
    }

    public void Move(Point newLocation)
    {
        Move(newLocation.X, newLocation.Y);
    }
}
