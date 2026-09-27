import Source from "../_lib/Source";

export const metadata = { title: "06. Inheritance" };

export default function Page() {
  return (
    <>
      <h1>06. Inheritance</h1>
      <p>
        <strong>Inheritance</strong> lets one class take on all the members of another. It models an{" "}
        <strong>is-a</strong> relationship: a text box <em>is a</em> presentation object. The main
        benefit is code reuse: shared code is written once, in one place.
      </p>

      <h2>Base and derived classes</h2>
      <p>
        The class you inherit from is the <strong>base</strong> (or parent) class. The new class is
        the <strong>derived</strong> (or child) class. Write the base after a colon. The derived
        class gets every public member of the base and adds its own.
      </p>
      <figure className="figure">
        <svg
          viewBox="0 0 760 230"
          role="img"
          aria-label="Text, Table and Shape inherit from PresentationObject, which inherits from object"
        >
          <g fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="305" y="1" width="150" height="44" rx="8" />
            <rect x="270" y="80" width="220" height="44" rx="8" stroke="var(--accent)" />
            <rect x="1" y="180" width="150" height="44" rx="8" />
            <rect x="305" y="180" width="150" height="44" rx="8" />
            <rect x="609" y="180" width="150" height="44" rx="8" />
            <path d="M380 45l-6 10h12zM380 55v25M380 124l-6 10h12zM380 134v46M76 180v-28h608v28" />
          </g>
          <g fill="var(--fg)" fontSize="14" textAnchor="middle">
            <text x="380" y="28">object</text>
            <text x="380" y="107">PresentationObject</text>
            <text x="76" y="207">Text</text>
            <text x="380" y="207">Table</text>
            <text x="684" y="207">Shape</text>
          </g>
        </svg>
        <figcaption>Arrows point from the derived class to its base class.</figcaption>
      </figure>
      <Source file="app/06-inheritance/Inheritance.cs" />
      <p>
        <code>Text</code> and <code>Table</code> never declare <code>Width</code>,{" "}
        <code>Height</code>, or <code>Copy</code>, yet both have them. Fix a bug in{" "}
        <code>Copy</code> once and every derived class gets the fix.
      </p>

      <h2>One base class only</h2>
      <p>
        A C# class can inherit from only <strong>one</strong> class. There is no{" "}
        <code>class Text : PresentationObject, Formatter</code>. When a class needs to play several
        roles, you use interfaces instead (lesson 12).
      </p>

      <h2>Everything is an object</h2>
      <p>
        A class without a base class still has one: <code>object</code> (short for{" "}
        <code>System.Object</code>). Every type in .NET ends up there, which is why every value has{" "}
        <code>ToString()</code>, <code>Equals()</code>, and <code>GetType()</code>.
      </p>
      <Source file="app/06-inheritance/Object.cs" />
      <p>
        Even <code>int</code> is an object: it derives from <code>ValueType</code>, which derives
        from <code>object</code>.
      </p>

      <div className="aspnet">
        <p>
          Every controller inherits from <code>ControllerBase</code>. That is where{" "}
          <code>Ok()</code>, <code>NotFound()</code>, <code>BadRequest()</code>, and{" "}
          <code>CreatedAtAction()</code> come from. Your database class inherits from Entity
          Framework&apos;s <code>DbContext</code> in the same way.
        </p>
        <Source
          title="ProductsController.cs"
          code={`public class ProductsController : ControllerBase
{
    [HttpGet("{id}")]
    public IActionResult Get(int id) => id == 1 ? Ok("Keyboard") : NotFound();
}`}
        />
      </div>
    </>
  );
}
