import Figure from "../_lib/Figure";
import Source from "../_lib/Source";

export const metadata = { title: "07. Composition" };

export default function Page() {
  return (
    <>
      <h1>07. Composition</h1>
      <p>
        <strong>Composition</strong> builds a class out of other objects. It models a{" "}
        <strong>has-a</strong> relationship: a car <em>has an</em> engine. Like inheritance, it
        reuses code, but it keeps classes loosely connected.
      </p>

      <Figure
        src="is-a-vs-has-a.png"
        alt="Left: a vehicle family tree with car and truck. Right: a car assembled from engine, wheels and radio."
        caption="Inheritance is a family tree. Composition is assembling parts."
      />

      <h2>Has-a in code</h2>
      <p>
        Instead of inheriting from <code>Logger</code>, each class receives a{" "}
        <code>Logger</code> object through its constructor and uses it. Both classes share the
        logging code without being related to each other.
      </p>
      <Source file="app/07-composition/Composition.cs" />

      <h2>When inheritance goes wrong</h2>
      <p>
        Inheritance is tempting because it is quick. But a base class makes a promise for every
        class below it, and that promise is hard to change later. Put <code>Walk</code> in{" "}
        <code>Animal</code>, and suddenly fish walk:
      </p>
      <Source file="app/07-composition/InheritanceTrap.cs" />
      <p>
        Fixing this means reshaping the whole hierarchy (<code>WalkingAnimal</code>,{" "}
        <code>SwimmingAnimal</code>, and so on). Deep hierarchies become fragile: a change at the
        top ripples down to every child.
      </p>

      <h2>The same idea with parts</h2>
      <p>
        With composition, each class picks the parts it needs. Nothing is forced on it.
      </p>
      <Source file="app/07-composition/Parts.cs" />

      <h2>Favor composition over inheritance</h2>
      <ul>
        <li>
          Use <strong>inheritance</strong> only for a true, stable is-a relationship, usually shallow
          (one or two levels).
        </li>
        <li>
          Use <strong>composition</strong> for everything else. It is easier to change, and parts can
          be swapped out.
        </li>
        <li>
          Combined with interfaces (lesson 12), you can swap a part without touching the class that
          uses it. That is the basis of testable code.
        </li>
      </ul>

      <div className="aspnet">
        <p>
          ASP.NET Core applications are built almost entirely by composition. A service receives a
          logger, a database context, and other services through its constructor, and the
          framework creates and passes them in for you.
        </p>
        <Source
          title="OrderService.cs"
          code={`public class OrderService(ILogger<OrderService> logger, AppDbContext db)
{
    public async Task PlaceAsync(Order order)
    {
        db.Orders.Add(order);
        await db.SaveChangesAsync();
        logger.LogInformation("Order {Id} placed", order.Id);
    }
}`}
        />
      </div>
    </>
  );
}
