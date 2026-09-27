var text = new Text();
var type = text.GetType();

Console.WriteLine(type.Name);
Console.WriteLine(type.BaseType?.Name);
Console.WriteLine(type.BaseType?.BaseType?.Name);

Console.WriteLine(text.ToString());
Console.WriteLine(42.GetType().BaseType?.Name);

class PresentationObject { }

class Text : PresentationObject { }
