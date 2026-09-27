import Source from "../_lib/Source";

export const metadata = { title: "11. Abstract & Sealed" };

export default function Page() {
  return (
    <>
      <h1>11. Abstract & Sealed</h1>
      <p>
        Two keywords that control inheritance from opposite ends. <code>abstract</code> says
        &ldquo;you must inherit from me and fill in the gaps&rdquo;. <code>sealed</code> says
        &ldquo;nobody may inherit from me&rdquo;.
      </p>

      <h2>Abstract classes</h2>
      <p>
        An <strong>abstract class</strong> is an incomplete class. It can declare{" "}
        <strong>abstract members</strong>: methods with a signature but no body. Every derived
        class must <code>override</code> them, or the code does not compile.
      </p>
      <p>
        Abstract classes can still hold normal code. Below, <code>Describe</code> is written once
        in <code>Shape</code> and works for every shape, because it calls the abstract{" "}
        <code>Draw</code> and <code>Area</code> that each subclass provides.
      </p>
      <Source file="app/11-abstract-sealed/Abstract.cs" />
      <ul>
        <li>
          An abstract member has no body and ends with <code>;</code>.
        </li>
        <li>
          Abstract members are implicitly <code>virtual</code>. Derived classes use{" "}
          <code>override</code>.
        </li>
        <li>A class with any abstract member must itself be abstract.</li>
      </ul>

      <h2>You cannot create an abstract class</h2>
      <p>
        A &ldquo;shape&rdquo; with no idea how to draw itself makes no sense, so the compiler
        blocks it:
      </p>
      <Source title="Does not compile" code={`var shape = new Shape();`} />
      <p>
        <code>error CS0144: Cannot create an instance of the abstract type or interface &apos;Shape&apos;</code>
      </p>
      <p>
        You can still use <code>Shape</code> as a variable or list type, like{" "}
        <code>List&lt;Shape&gt;</code> above. That is the whole point: write code against the
        general type, run the specific behavior.
      </p>

      <h2>Sealed classes and methods</h2>
      <p>
        A <strong>sealed class</strong> cannot be inherited. A <strong>sealed override</strong>{" "}
        lets you override a method one last time, then stops further subclasses from changing it.
      </p>
      <Source file="app/11-abstract-sealed/Sealed.cs" />
      <p>
        <code>SuperAdmin</code> inherits <code>Admin</code>&apos;s greeting and cannot replace it.
        Writing <code>class Hacker : ApiToken</code> would fail with error CS0509.
      </p>

      <h2>When to use which</h2>
      <table>
        <thead>
          <tr>
            <th>Use</th>
            <th>When</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>abstract</code>
            </td>
            <td>
              Several classes share code, but each must supply part of the behavior itself.
            </td>
          </tr>
          <tr>
            <td>
              <code>sealed</code>
            </td>
            <td>
              A class is not designed for extension, or changing its behavior would break
              guarantees (security, correctness).
            </td>
          </tr>
          <tr>
            <td>neither</td>
            <td>The default. Most of your classes will be plain classes.</td>
          </tr>
        </tbody>
      </table>
      <div className="tip">
        <p>
          Sealing is cheap insurance. Many teams seal classes by default and unseal only when
          inheritance is actually needed. The runtime can also call sealed methods slightly
          faster.
        </p>
      </div>

      <div className="aspnet">
        <p>
          <code>ControllerBase</code>, the base of every API controller, is an abstract class: you
          cannot create it, only inherit from it. Many framework types you will receive, such as
          request and response classes, are abstract too, and you work with them through their
          general type.
        </p>
        <Source
          title="ProductsController.cs"
          code={`[ApiController]
[Route("products")]
public sealed class ProductsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll() => Ok(new[] { "Keyboard", "Mouse" });
}`}
        />
      </div>
    </>
  );
}
