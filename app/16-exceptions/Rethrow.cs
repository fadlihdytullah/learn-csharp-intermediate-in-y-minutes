try
{
    LoadSettings();
}
catch (InvalidOperationException ex)
{
    Console.WriteLine($"Outer: {ex.Message}");
    Console.WriteLine($"Inner: {ex.InnerException?.Message}");
}

static void LoadSettings()
{
    try
    {
        ReadFile();
    }
    catch (FileNotFoundException ex)
    {
        Console.WriteLine($"Logging: {ex.Message}");
        throw new InvalidOperationException("Could not load settings.", ex);
    }
}

static void ReadFile() => throw new FileNotFoundException("settings.json was not found.");
