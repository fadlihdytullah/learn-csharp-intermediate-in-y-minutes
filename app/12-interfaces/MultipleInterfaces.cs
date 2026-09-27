var doc = new Document("notes.txt");
doc.Write("Interfaces are contracts.");
Console.WriteLine(doc.Read());

IReadable readable = doc;
Console.WriteLine(readable.Read());

Console.WriteLine(doc is IWritable);

interface IReadable
{
    string Read();
}

interface IWritable
{
    void Write(string text);
}

class Document(string name) : IReadable, IWritable
{
    private string content = "";

    public string Read() => $"{name}: {content}";

    public void Write(string text) => content = text;
}
