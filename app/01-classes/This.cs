var counter = new Counter();
counter.Add(2).Add(3).Add(5);

Console.WriteLine(counter.Total);

class Counter
{
    public int Total;

    public Counter Add(int amount)
    {
        this.Total += amount;
        return this;
    }
}
