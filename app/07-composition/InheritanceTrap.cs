var dog = new Dog();
var fish = new Fish();

dog.Walk();
fish.Walk();

class Animal
{
    public void Eat()
    {
        Console.WriteLine($"{GetType().Name} is eating.");
    }

    public void Walk()
    {
        Console.WriteLine($"{GetType().Name} is walking.");
    }
}

class Dog : Animal { }

class Fish : Animal { }
