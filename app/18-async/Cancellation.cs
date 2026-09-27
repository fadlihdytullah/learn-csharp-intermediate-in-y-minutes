using var timeout = new CancellationTokenSource(TimeSpan.FromMilliseconds(250));

try
{
    await GenerateReportAsync(timeout.Token);
}
catch (OperationCanceledException)
{
    Console.WriteLine("Cancelled: the report took too long");
}

static async Task GenerateReportAsync(CancellationToken cancellationToken)
{
    for (var step = 1; step <= 5; step++)
    {
        await Task.Delay(100, cancellationToken);
        Console.WriteLine($"Step {step} done");
    }
    Console.WriteLine("Report finished");
}
