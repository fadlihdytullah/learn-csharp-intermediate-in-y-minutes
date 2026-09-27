#:package Microsoft.Extensions.DependencyInjection@10.0.0

using Microsoft.Extensions.DependencyInjection;

var services = new ServiceCollection();
services.AddSingleton<SingletonService>();
services.AddScoped<ScopedService>();
services.AddTransient<TransientService>();

var provider = services.BuildServiceProvider();

for (var request = 1; request <= 2; request++)
{
    using var scope = provider.CreateScope();
    var sp = scope.ServiceProvider;

    Console.WriteLine($"Request {request}");
    Console.WriteLine($"  singleton: {sp.GetRequiredService<SingletonService>().Id} {sp.GetRequiredService<SingletonService>().Id}");
    Console.WriteLine($"  scoped:    {sp.GetRequiredService<ScopedService>().Id} {sp.GetRequiredService<ScopedService>().Id}");
    Console.WriteLine($"  transient: {sp.GetRequiredService<TransientService>().Id} {sp.GetRequiredService<TransientService>().Id}");
}

class SingletonService
{
    static int count;
    public int Id { get; } = ++count;
}

class ScopedService
{
    static int count;
    public int Id { get; } = ++count;
}

class TransientService
{
    static int count;
    public int Id { get; } = ++count;
}
