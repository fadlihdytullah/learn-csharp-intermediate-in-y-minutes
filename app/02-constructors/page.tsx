import Source from "../_lib/Source";

export const metadata = { title: "02. Constructors" };

export default function Page() {
  return (
    <>
      <h1>02. Constructors</h1>
      <p>
        A <strong>constructor</strong> is a special method that runs when an object is created. Its
        job is to put the object in a valid starting state, so nobody can use a half-built object.
      </p>

      <h2>The default constructor</h2>
      <p>
        If you write no constructor, C# adds an empty one for you. Every field then gets its{" "}
        <strong>default value</strong>: <code>0</code> for numbers, <code>false</code> for{" "}
        <code>bool</code>, and <code>null</code> for reference types.
      </p>
      <Source file="app/02-constructors/Default.cs" />

      <h2>Your own constructor</h2>
      <p>
        A constructor has the same name as the class and no return type. Parameters let the caller
        pass required data. Once you define one, the free default constructor disappears, so a{" "}
        <code>Customer</code> can no longer be created without an id and a name.
      </p>
      <Source file="app/02-constructors/Constructor.cs" />

      <h2>Overloading and chaining</h2>
      <p>
        A class can have several constructors with different parameters. This is called{" "}
        <strong>overloading</strong>. To avoid repeating code, one constructor can call another with{" "}
        <code>: this(...)</code>. The called constructor runs first.
      </p>
      <Source file="app/02-constructors/Overloading.cs" />
      <div className="tip">
        <p>
          Always initialize lists in the constructor (or on the field). Otherwise{" "}
          <code>Orders</code> is <code>null</code>, and the first <code>Orders.Add</code> crashes with
          a <code>NullReferenceException</code>.
        </p>
      </div>

      <h2>Object initializers</h2>
      <p>
        Writing a constructor for every combination of fields gets out of hand. An{" "}
        <strong>object initializer</strong> sets fields right after construction, using braces. Set
        only what you need.
      </p>
      <Source file="app/02-constructors/ObjectInitializer.cs" />

      <h2>Primary constructors</h2>
      <p>
        A <strong>primary constructor</strong> puts the parameters right after the class name. They
        are available in every member of the class. This short form is perfect when a class just
        receives the objects it depends on.
      </p>
      <Source file="app/02-constructors/PrimaryConstructor.cs" />

      <div className="aspnet">
        <p>
          Controllers and services receive their dependencies through the constructor, and ASP.NET
          Core calls that constructor for you. With a primary constructor, a controller is only a few
          lines:
        </p>
        <Source
          title="OrdersController.cs"
          code={`[ApiController]
[Route("api/orders")]
public class OrdersController(IOrderService orders) : ControllerBase
{
    [HttpGet("{id}")]
    public IActionResult Get(int id) => Ok(orders.Find(id));
}`}
        />
        <p>Lesson 13 explains how ASP.NET Core knows what to pass in.</p>
      </div>
    </>
  );
}
