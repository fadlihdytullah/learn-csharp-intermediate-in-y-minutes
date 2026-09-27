INotifier email = new EmailNotifier();
email.Send("ada@example.com", "Your order has shipped.");

INotifier sms = new SmsNotifier();
sms.Send("+62 812 0000 0000", "Your order has shipped.");

interface INotifier
{
    void Send(string to, string message);
}

class EmailNotifier : INotifier
{
    public void Send(string to, string message) =>
        Console.WriteLine($"Email to {to}: {message}");
}

class SmsNotifier : INotifier
{
    public void Send(string to, string message) =>
        Console.WriteLine($"SMS to {to}: {message}");
}
