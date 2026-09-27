import Quiz from "../_lib/Quiz";
import Source from "../_lib/Source";

export const metadata = { title: "05. Properties & Indexers" };

export default function Page() {
  return (
    <>
      <h1>05. Properties & Indexers</h1>
      <p>
        A <strong>property</strong> looks like a field from the outside but runs code on read and
        write. It gives you encapsulation without Get and Set methods. In modern C#, public data is
        almost always a property.
      </p>

      <h2>A full property</h2>
      <p>
        A property has a <code>get</code> accessor, a <code>set</code> accessor, or both. Inside{" "}
        <code>set</code>, the keyword <code>value</code> holds the incoming value. The data itself
        lives in a private <strong>backing field</strong>.
      </p>
      <Source file="app/05-properties/FullProperty.cs" />
      <div className="tip">
        <p>
          C# 14 can create the backing field for you. Inside an accessor, the keyword{" "}
          <code>field</code> refers to it:{" "}
          <code>{"public string Name { get; set => field = value.Trim(); } = \"\";"}</code>
        </p>
      </div>

      <h2>Auto-properties</h2>
      <p>
        When there is no logic, write <code>{"{ get; set; }"}</code> and the compiler adds the
        backing field. Change what callers may do per accessor:
      </p>
      <ul>
        <li>
          <code>private set</code>: only the class can change it.
        </li>
        <li>
          <code>init</code>: can be set only while creating the object, then it is read-only.
        </li>
        <li>
          <code>required</code>: the caller must set it in the object initializer, or the code does
          not compile.
        </li>
      </ul>
      <Source file="app/05-properties/AutoProperty.cs" />

      <h2>Computed properties</h2>
      <p>
        A property with only a <code>get</code> can calculate its value from other data. Store the
        birthdate, compute the age. It is never out of date.
      </p>
      <Source file="app/05-properties/Computed.cs" />

      <h2>Indexers</h2>
      <p>
        An <strong>indexer</strong> lets an object be used with square brackets, like an array or a
        dictionary. Declare it with <code>this[...]</code> and write <code>get</code> and{" "}
        <code>set</code> like a property.
      </p>
      <Source file="app/05-properties/Indexer.cs" />

      <div className="aspnet">
        <p>
          Request and response bodies are classes with properties. The JSON serializer reads and
          writes public properties, not fields, and a <code>required</code> property makes
          deserialization fail when the client leaves it out. Indexers show up too:{" "}
          <code>{"Request.Headers[\"User-Agent\"]"}</code> and{" "}
          <code>{"Request.Cookies[\"theme\"]"}</code>.
        </p>
        <Source
          title="CreateProductRequest.cs"
          code={`public class CreateProductRequest
{
    public required string Name { get; init; }
    public decimal Price { get; init; }
}`}
        />
      </div>

      <Quiz
        questions={[
          {
            q: "Inside a property's `set` accessor, which keyword holds the incoming value?",
            options: [
              "`this`",
              "`value`",
              "`init`",
            ],
            answer: 1,
            explanation: "The data itself usually lives in a private backing field.",
          },
          {
            q: "What happens if a caller leaves out a `required` property in the object initializer?",
            options: [
              "It gets its default value",
              "It throws at runtime",
              "The code does not compile",
            ],
            answer: 2,
            explanation: "`required` forces the caller to set it when creating the object.",
          },
          {
            q: "What does an `init` accessor allow?",
            options: [
              "Setting the property only while creating the object",
              "Setting it from anywhere, at any time",
              "Setting it only inside the class",
            ],
            answer: 0,
            explanation: "After creation the property is read-only.",
          },
        ]}
      />
    </>
  );
}
