Greet("Ada");
Greet("Linus", "Welcome");
Greet("Grace", punctuation: "?");
Greet(punctuation: ".", greeting: "Hey", name: "Alan");

static void Greet(string name, string greeting = "Hello", string punctuation = "!")
{
    Console.WriteLine($"{greeting}, {name}{punctuation}");
}
