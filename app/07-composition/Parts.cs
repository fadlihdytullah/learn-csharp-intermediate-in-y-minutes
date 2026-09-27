var dog = new Dog(new Legs());
var fish = new Fish(new Fins());

dog.Move();
fish.Move();

class Legs
{
    public void Walk(string who) => Console.WriteLine($"{who} is walking.");
}

class Fins
{
    public void Swim(string who) => Console.WriteLine($"{who} is swimming.");
}

class Dog(Legs legs)
{
    public void Move() => legs.Walk("Dog");
}

class Fish(Fins fins)
{
    public void Move() => fins.Swim("Fish");
}
