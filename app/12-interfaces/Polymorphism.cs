List<INotifier> channels = [new EmailNotifier(), new SmsNotifier(), new PushNotifier()];

foreach (var channel in channels)
{
    channel.Send("Ada", "Payment received.");
}

interface INotifier
{
    void Send(string to, string message);
}

class EmailNotifier : INotifier
{
    public void Send(string to, string message) => Console.WriteLine($"Email -> {to}: {message}");
}

class SmsNotifier : INotifier
{
    public void Send(string to, string message) => Console.WriteLine($"SMS   -> {to}: {message}");
}

class PushNotifier : INotifier
{
    public void Send(string to, string message) => Console.WriteLine($"Push  -> {to}: {message}");
}
