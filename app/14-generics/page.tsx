import Source from "../_lib/Source";

export const metadata = { title: "14. Generics" };

export default function Page() {
  return (
    <>
      <h1>14. Generics</h1>
      <p>
        <strong>Generics</strong> let you write a class or method once and use it with any type,
        while keeping full type safety. You have used them since the beginners course:{" "}
        <code>List&lt;int&gt;</code> is a generic class filled in with <code>int</code>.
      </p>

      <h2>The problem generics solve</h2>
      <p>
        Before generics, reusable collections stored <code>object</code>. Anything could go in,
        so mistakes only showed up when the program ran. Every value type was also boxed on the
        way in and cast on the way out.
      </p>
      <Source file="app/14-generics/Problem.cs" />
      <p>
        With <code>List&lt;int&gt;</code> the compiler refuses <code>list.Add(&quot;thirty&quot;)</code>{" "}
        before the program ever runs. A bug caught at compile time is a bug no user sees.
      </p>

      <h2>A generic class</h2>
      <p>
        Put a <strong>type parameter</strong> in angle brackets after the class name. By
        convention it is called <code>T</code>. Inside the class, <code>T</code> stands for
        whatever type the caller picks.
      </p>
      <Source file="app/14-generics/Repository.cs" />
      <p>
        One <code>Repository&lt;T&gt;</code> serves products, customers, and any type you add
        later. (<code>record</code> is a short way to declare a data class. More in lesson 15.)
      </p>

      <h2>Generic methods</h2>
      <p>
        A single method can be generic too. The compiler usually <strong>infers</strong>{" "}
        <code>T</code> from the arguments, so you rarely write it. When the arguments disagree, as
        in <code>Max&lt;double&gt;(2, 2.5)</code>, you name it explicitly.
      </p>
      <Source file="app/14-generics/GenericMethods.cs" />

      <h2>Constraints</h2>
      <p>
        By default you can do almost nothing with a <code>T</code>, because it could be any type.
        A <strong>constraint</strong> (<code>where</code>) narrows what <code>T</code> may be, and
        in exchange unlocks what you can do with it.
      </p>
      <Source file="app/14-generics/Constraints.cs" />
      <table>
        <thead>
          <tr>
            <th>Constraint</th>
            <th>T must be</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>where T : class</code>
            </td>
            <td>A reference type (so it can be <code>null</code>)</td>
          </tr>
          <tr>
            <td>
              <code>where T : struct</code>
            </td>
            <td>A value type</td>
          </tr>
          <tr>
            <td>
              <code>where T : IEntity</code>
            </td>
            <td>A type that implements the interface (or inherits the class)</td>
          </tr>
          <tr>
            <td>
              <code>where T : new()</code>
            </td>
            <td>A type with a parameterless constructor</td>
          </tr>
        </tbody>
      </table>

      <h2>Dictionary&lt;TKey, TValue&gt;</h2>
      <p>
        Generics can take several type parameters. A <strong>dictionary</strong> maps unique keys
        to values and finds a value by key almost instantly, no matter how large it gets.
      </p>
      <Source file="app/14-generics/Dictionary.cs" />
      <div className="tip">
        <p>
          Reading a missing key with <code>stock[&quot;webcam&quot;]</code> throws{" "}
          <code>KeyNotFoundException</code>. Use <code>TryGetValue</code> when the key might not
          exist.
        </p>
      </div>

      <div className="aspnet">
        <p>
          Generics are everywhere in ASP.NET Core. <code>ILogger&lt;T&gt;</code> is a logger tagged
          with your class name, <code>ActionResult&lt;T&gt;</code> is a response that carries a{" "}
          <code>T</code>, and EF Core&apos;s <code>DbSet&lt;T&gt;</code> is a database table of{" "}
          <code>T</code>.
        </p>
        <Source
          title="ProductsController.cs"
          code={`public class ProductsController(AppDbContext db, ILogger<ProductsController> logger)
    : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> Get(int id)
    {
        var product = await db.Products.FindAsync(id);
        if (product is null) return NotFound();
        logger.LogInformation("Found product {Id}", id);
        return product;
    }
}`}
        />
      </div>
    </>
  );
}
