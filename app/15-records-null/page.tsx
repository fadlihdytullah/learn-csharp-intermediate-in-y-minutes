import Quiz from "../_lib/Quiz";
import Source from "../_lib/Source";

export const metadata = { title: "15. Records & Null Safety" };

export default function Page() {
  return (
    <>
      <h1>15. Records & Null Safety</h1>
      <p>
        Two modern C# features you will use in every Web API. <strong>Records</strong> are the
        shortest way to declare a type that just carries data. <strong>Nullable reference
        types</strong> make the compiler warn you before a <code>null</code> crashes your program.
      </p>

      <h2>Records</h2>
      <p>
        A <strong>positional record</strong> declares its properties in one line. The compiler
        generates the constructor, read-only properties, a readable <code>ToString</code>, and{" "}
        <strong>value equality</strong>: two records are equal when all their values are equal.
        Classes compare by reference, so two separate objects are never equal.
      </p>
      <Source file="app/15-records-null/Records.cs" />

      <h2>Immutability and with</h2>
      <p>
        Record properties cannot be changed after creation. To &ldquo;change&rdquo; one, you make a
        copy with a <code>with</code> expression. The original stays untouched, so data that is
        passed around cannot be modified behind your back.
      </p>
      <Source file="app/15-records-null/With.cs" />
      <ul>
        <li>
          Positional records can be <strong>deconstructed</strong> into variables:{" "}
          <code>var (name, price) = discounted;</code>
        </li>
        <li>
          A <code>record struct</code> is the value-type version, good for tiny values like a
          point.
        </li>
      </ul>

      <h2>Nullable reference types</h2>
      <p>
        Any reference type variable could hold <code>null</code>, and calling a member on{" "}
        <code>null</code> throws <code>NullReferenceException</code>, the most common crash in C#.
        With nullable reference types enabled (the default in new projects), the type itself says
        whether <code>null</code> is allowed:
      </p>
      <ul>
        <li>
          <code>string</code> means never null.
        </li>
        <li>
          <code>string?</code> means maybe null.
        </li>
      </ul>
      <Source
        title="Compiler warnings"
        code={`string name = null;

string? middle = GetMiddleName();
Console.WriteLine(middle.Length);`}
      />
      <p>
        The first line warns <code>CS8600</code> (null into a non-nullable type). The last line
        warns <code>CS8602</code> (dereference of a possibly null reference). These are warnings,
        not errors, but treat them as bugs.
      </p>

      <h2>Null operators</h2>
      <table>
        <thead>
          <tr>
            <th>Operator</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>a?.B</code>
            </td>
            <td>
              Access <code>B</code> only if <code>a</code> is not null, otherwise the result is
              null
            </td>
          </tr>
          <tr>
            <td>
              <code>a ?? b</code>
            </td>
            <td>
              Use <code>a</code>, or <code>b</code> if <code>a</code> is null
            </td>
          </tr>
          <tr>
            <td>
              <code>a ??= b</code>
            </td>
            <td>
              Assign <code>b</code> to <code>a</code> only if <code>a</code> is null
            </td>
          </tr>
          <tr>
            <td>
              <code>a is null</code>
            </td>
            <td>The safe way to test for null</td>
          </tr>
          <tr>
            <td>
              <code>a!</code>
            </td>
            <td>&ldquo;Trust me, this is not null&rdquo;: silences the warning, checks nothing</td>
          </tr>
        </tbody>
      </table>
      <Source file="app/15-records-null/Nullable.cs" />
      <p>
        After <code>is null</code> fails, the compiler knows <code>MiddleName</code> is not null
        in the <code>else</code> branch, so <code>.Length</code> gives no warning.
      </p>
      <div className="tip">
        <p>
          Avoid <code>!</code>. If you are wrong, you get the very crash the feature was meant to
          prevent. Prefer a real check with <code>is null</code> or <code>??</code>.
        </p>
      </div>

      <div className="aspnet">
        <p>
          Records are the standard way to write <strong>DTOs</strong> (data transfer objects): the
          shapes of JSON requests and responses. Nullability matters here too: with{" "}
          <code>[ApiController]</code>, a non-nullable <code>string</code> property is treated as
          required, so a missing value returns a <code>400 Bad Request</code> automatically.
        </p>
        <Source
          title="Dtos.cs"
          code={`public record CreateProductRequest(string Name, decimal Price, string? Description);

public record ProductResponse(int Id, string Name, decimal Price);`}
        />
      </div>

      <Quiz
        questions={[
          {
            q: "Two separate record objects hold the same values. Are they equal?",
            options: [
              "Yes, records use value equality",
              "No, they are different objects",
              "Only if you override `Equals`",
            ],
            answer: 0,
            explanation: "Classes compare by reference; records compare their values.",
          },
          {
            q: "How do you \"change\" a property of a record?",
            options: [
              "Assign it directly",
              "Make a copy with a `with` expression",
              "Call its `Update` method",
            ],
            answer: 1,
            explanation: "The original stays untouched.",
          },
          {
            q: "What does `a ?? b` mean?",
            options: [
              "Assign `b` to `a`",
              "Throw if `a` is null",
              "Use `a`, or `b` if `a` is null",
            ],
            answer: 2,
            explanation: "`??=` is the version that assigns only when `a` is null.",
          },
        ]}
      />
    </>
  );
}
