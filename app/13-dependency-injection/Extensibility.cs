new DbMigrator(new ConsoleLogger()).Migrate();

var path = Path.Combine(Path.GetTempPath(), "migrations.log");
File.Delete(path);
new DbMigrator(new FileLogger(path)).Migrate();
Console.WriteLine($"{Path.GetFileName(path)} has {File.ReadAllLines(path).Length} lines");
File.Delete(path);

interface ILogger
{
    void Info(string message);
}

class ConsoleLogger : ILogger
{
    public void Info(string message) => Console.WriteLine($"[info] {message}");
}

class FileLogger(string path) : ILogger
{
    public void Info(string message) => File.AppendAllText(path, $"[info] {message}{Environment.NewLine}");
}

class DbMigrator(ILogger logger)
{
    public void Migrate()
    {
        logger.Info("Migration started");
        logger.Info("Migration finished");
    }
}
