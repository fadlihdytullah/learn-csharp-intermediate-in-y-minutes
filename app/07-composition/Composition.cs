var logger = new Logger();
var migrator = new DbMigrator(logger);
var installer = new Installer(logger);

migrator.Migrate();
installer.Install();

class Logger
{
    public void Log(string message)
    {
        Console.WriteLine($"LOG: {message}");
    }
}

class DbMigrator(Logger logger)
{
    public void Migrate()
    {
        logger.Log("Migrating the database...");
    }
}

class Installer(Logger logger)
{
    public void Install()
    {
        logger.Log("Installing the application...");
    }
}
