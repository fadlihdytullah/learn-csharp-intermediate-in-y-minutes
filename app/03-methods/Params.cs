var calculator = new Calculator();

Console.WriteLine(calculator.Add(1, 2));
Console.WriteLine(calculator.Add(1, 2, 3, 4));
Console.WriteLine(calculator.Add([10, 20, 30]));
Console.WriteLine(calculator.Add());

class Calculator
{
    public int Add(params int[] numbers)
    {
        var sum = 0;
        foreach (var number in numbers)
            sum += number;
        return sum;
    }
}
