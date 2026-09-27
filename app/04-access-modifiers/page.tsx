import Source from "../_lib/Source";

export const metadata = { title: "04. Fields & Access" };

export default function Page() {
  return (
    <>
      <h1>04. Fields & Access</h1>
      <p>
        Fields store an object&apos;s state. <strong>Access modifiers</strong> decide who may read
        or change that state. Getting this right keeps objects valid no matter who uses them.
      </p>

      <h2>readonly and const</h2>
      <p>
        A <strong>readonly</strong> field can be set only where it is declared or in a constructor.
        After that it is fixed for the life of the object. A <strong>const</strong> is fixed at
        compile time, is the same for every object, and is accessed on the class name.
      </p>
      <Source file="app/04-access-modifiers/Readonly.cs" />
      <div className="tip">
        <p>
          <code>readonly</code> protects the field, not the object inside it. You cannot replace{" "}
          <code>Orders</code> with a new list, but you can still add items to it.
        </p>
      </div>

      <h2>The problem with public fields</h2>
      <p>
        A <strong>public</strong> member is visible to any code. When a field is public, anyone can
        put any value in it, even one that makes no sense.
      </p>
      <Source file="app/04-access-modifiers/PublicField.cs" />

      <h2>Encapsulation</h2>
      <p>
        A <strong>private</strong> member is visible only inside its own class. Make the field
        private and expose methods that check the value first. Hiding the data and guarding every
        change is called <strong>encapsulation</strong>.
      </p>
      <Source file="app/04-access-modifiers/Encapsulation.cs" />
      <ul>
        <li>
          Private fields are named <code>_camelCase</code>. Public members use{" "}
          <code>PascalCase</code>.
        </li>
        <li>
          Members are private by default, but writing <code>private</code> makes the intent clear.
        </li>
        <li>
          Get and Set methods work, but C# has a shorter form for exactly this: properties, in the
          next lesson.
        </li>
      </ul>

      <div className="aspnet">
        <p>
          The most common field in an ASP.NET Core service is a <code>private readonly</code>{" "}
          dependency, set once in the constructor and never replaced:
        </p>
        <Source
          title="OrderService.cs"
          code={`public class OrderService
{
    private readonly IOrderRepository _repository;

    public OrderService(IOrderRepository repository)
    {
        _repository = repository;
    }
}`}
        />
      </div>
    </>
  );
}
