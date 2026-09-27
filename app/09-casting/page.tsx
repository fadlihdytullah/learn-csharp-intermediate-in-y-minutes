import Quiz from "../_lib/Quiz";
import Source from "../_lib/Source";

export const metadata = { title: "09. Casting & Boxing" };

export default function Page() {
  return (
    <>
      <h1>09. Casting & Boxing</h1>
      <p>
        With inheritance, one object can be seen through different types. A <code>Text</code> is
        also a <code>Shape</code>. <strong>Casting</strong> changes the type you view an object
        through. The object itself never changes.
      </p>

      <h2>Upcasting</h2>
      <p>
        <strong>Upcasting</strong> goes from a derived class to a base class. It is always safe, so
        it happens automatically. Both variables point to the same object; the base-type variable
        just sees fewer members (no <code>FontSize</code>).
      </p>
      <Source file="app/09-casting/Upcasting.cs" />

      <h2>Downcasting</h2>
      <p>
        <strong>Downcasting</strong> goes from a base class back to a derived class. It can fail, so
        you must write it explicitly with <code>(Type)</code>. If the object is not really that
        type, you get an <code>InvalidCastException</code> at runtime.
      </p>
      <Source file="app/09-casting/Downcasting.cs" />

      <h2>is and as: casting safely</h2>
      <ul>
        <li>
          <code>shape is Text t</code> checks the type and, if it matches, gives you a typed
          variable <code>t</code> in one step. This is called <strong>pattern matching</strong>.
        </li>
        <li>
          <code>shape as Text</code> returns the cast object, or <code>null</code> instead of
          throwing.
        </li>
      </ul>
      <Source file="app/09-casting/IsAs.cs" />
      <p>
        Prefer <code>is</code> with a variable in modern C#. Needing many downcasts is usually a sign
        the design should use polymorphism instead (next lesson).
      </p>

      <h2>Boxing and unboxing</h2>
      <p>
        Value types like <code>int</code> live directly in variables. When you store one in an{" "}
        <code>object</code>, .NET copies it into a new object on the heap. That is{" "}
        <strong>boxing</strong>. Getting the value back with a cast is <strong>unboxing</strong>.
        The box is a copy, so changing the original does not change it.
      </p>
      <Source file="app/09-casting/Boxing.cs" />
      <p>
        Old collections like <code>ArrayList</code> store everything as <code>object</code>: every
        number gets boxed, and nothing stops you from mixing types. Generic{" "}
        <code>{"List<int>"}</code> stores real ints, with no boxing and full type safety. Always use
        the generic collections.
      </p>

      <div className="aspnet">
        <p>
          Pattern matching on types is how a global error handler turns exceptions into HTTP status
          codes:
        </p>
        <Source
          title="ErrorHandler.cs"
          code={`var status = exception switch
{
    NotFoundException => StatusCodes.Status404NotFound,
    ValidationException => StatusCodes.Status400BadRequest,
    _ => StatusCodes.Status500InternalServerError
};`}
        />
        <p>Lesson 16 covers custom exceptions.</p>
      </div>

      <Quiz
        questions={[
          {
            q: "Which cast can fail at runtime?",
            options: [
              "Upcasting",
              "Downcasting",
              "Neither",
            ],
            answer: 1,
            explanation: "If the object is not really that type, you get an `InvalidCastException`.",
          },
          {
            q: "What does `shape as Text` give you when `shape` is not a `Text`?",
            options: [
              "`null`",
              "An `InvalidCastException`",
              "An empty `Text`",
            ],
            answer: 0,
            explanation: "`as` returns `null` instead of throwing.",
          },
          {
            q: "What happens when you store an `int` in an `object` variable?",
            options: [
              "It is converted to a string",
              "Nothing, `int` is already a reference type",
              "It is boxed: copied into a new object on the heap",
            ],
            answer: 2,
            explanation: "The box is a copy, so changing the original does not change it.",
          },
        ]}
      />
    </>
  );
}
