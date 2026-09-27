import Quiz from "../_lib/Quiz";
import Source from "../_lib/Source";

export const metadata = { title: "17. Lambdas & LINQ" };

export default function Page() {
  return (
    <>
      <h1>17. Lambdas & LINQ</h1>
      <p>
        A <strong>lambda</strong> is a small function written inline. <strong>LINQ</strong>{" "}
        (Language Integrated Query) is a set of methods that filter, sort, and reshape collections
        using lambdas. Together they replace most hand-written loops with one readable line.
      </p>

      <h2>Lambdas, Func, and Action</h2>
      <p>
        <code>x =&gt; x * x</code> reads &ldquo;x goes to x times x&rdquo;: parameters on the left,
        result on the right. Lambdas are stored in delegate types:
      </p>
      <ul>
        <li>
          <code>Func&lt;int, int&gt;</code> takes an <code>int</code> and returns an{" "}
          <code>int</code>. The last type parameter is always the return type.
        </li>
        <li>
          <code>Action&lt;string&gt;</code> takes a <code>string</code> and returns nothing.
        </li>
      </ul>
      <Source file="app/17-linq/Lambdas.cs" />
      <p>
        The key idea is the last part: <code>Apply</code> receives <em>behavior</em> as a
        parameter. LINQ is built entirely on this.
      </p>

      <h2>Filter, sort, project</h2>
      <p>
        LINQ methods chain together. Each one takes a lambda that describes what you want, not how
        to loop.
      </p>
      <Source file="app/17-linq/Linq.cs" />
      <table>
        <thead>
          <tr>
            <th>Method</th>
            <th>Does</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>Where</code>
            </td>
            <td>Keeps items that match a condition</td>
          </tr>
          <tr>
            <td>
              <code>OrderBy</code> / <code>OrderByDescending</code>
            </td>
            <td>Sorts by a key</td>
          </tr>
          <tr>
            <td>
              <code>Select</code>
            </td>
            <td>Turns each item into something else (projection)</td>
          </tr>
          <tr>
            <td>
              <code>First</code> / <code>FirstOrDefault</code>
            </td>
            <td>
              First match. <code>First</code> throws if none, <code>FirstOrDefault</code> returns{" "}
              <code>null</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>Single</code>
            </td>
            <td>Exactly one match, throws otherwise</td>
          </tr>
          <tr>
            <td>
              <code>Any</code>, <code>Count</code>, <code>Sum</code>, <code>Max</code>
            </td>
            <td>Answer a question about the whole collection</td>
          </tr>
        </tbody>
      </table>

      <h2>Grouping</h2>
      <p>
        <code>GroupBy</code> splits items into buckets by a key. Each group has a{" "}
        <code>Key</code> and is itself a collection you can count or sum.{" "}
        <code>new {"{ ... }"}</code> creates an <strong>anonymous type</strong>, a quick unnamed
        object for holding results.
      </p>
      <Source file="app/17-linq/GroupBy.cs" />

      <h2>Paging with Skip and Take</h2>
      <p>
        <code>Skip</code> jumps over items and <code>Take</code> keeps a fixed number. Together
        they return one page of results.
      </p>
      <Source file="app/17-linq/Paging.cs" />
      <p>
        C# also has a SQL-like <strong>query syntax</strong> that compiles to the same method
        calls. You will see it in older code, but method syntax is more common today:
      </p>
      <Source
        title="Query syntax"
        code={`var cheap = from p in products
            where p.Price < 100
            orderby p.Price
            select p.Name;`}
      />

      <h2>Deferred execution</h2>
      <p>
        A LINQ query does not run when you write it. It runs when you loop over it or call a
        method like <code>ToList</code>. This is <strong>deferred execution</strong>.
      </p>
      <Source file="app/17-linq/Deferred.cs" />
      <div className="tip">
        <p>
          Call <code>ToList()</code> when you want a fixed result. Looping over the same query
          twice runs it twice, which is costly when it hits a database.
        </p>
      </div>

      <div className="aspnet">
        <p>
          EF Core, the standard database library, speaks LINQ. The same <code>Where</code>,{" "}
          <code>OrderBy</code>, <code>Skip</code>, and <code>Take</code> you just learned are
          translated to SQL and run inside the database. Deferred execution is why nothing hits
          the database until <code>ToListAsync()</code>.
        </p>
        <Source
          title="ProductsEndpoint.cs"
          code={`app.MapGet("/products", async (AppDbContext db, int page = 1) =>
    await db.Products
        .Where(p => p.Price < 100)
        .OrderBy(p => p.Name)
        .Skip((page - 1) * 10)
        .Take(10)
        .ToListAsync());`}
        />
      </div>

      <Quiz
        questions={[
          {
            q: "In `Func<int, string>`, which type is the return type?",
            options: [
              "`int`",
              "`string`",
              "Neither, `Func` returns nothing",
            ],
            answer: 1,
            explanation: "The last type parameter of `Func` is always the return type.",
          },
          {
            q: "What does `Select` do?",
            options: [
              "Keeps items that match a condition",
              "Returns the first match",
              "Turns each item into something else",
            ],
            answer: 2,
            explanation: "Filtering is `Where`; `Select` is projection.",
          },
          {
            q: "When does a LINQ query actually run?",
            options: [
              "When you loop over it or call a method like `ToList`",
              "The moment you write it",
              "Only when the program ends",
            ],
            answer: 0,
            explanation: "This is deferred execution, so looping twice runs it twice.",
          },
        ]}
      />
    </>
  );
}
