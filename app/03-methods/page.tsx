import Quiz from "../_lib/Quiz";
import Source from "../_lib/Source";

export const metadata = { title: "03. Methods" };

export default function Page() {
  return (
    <>
      <h1>03. Methods</h1>
      <p>
        A <strong>method</strong> is a named block of code. Its <strong>signature</strong> is its
        name plus the number and types of its parameters. The return type comes before the name,
        or <code>void</code> if it returns nothing.
      </p>

      <h2>Overloading</h2>
      <p>
        Several methods can share a name as long as their signatures differ. The compiler picks
        the right one from the arguments you pass. Let one overload call the other so the logic
        lives in one place.
      </p>
      <Source file="app/03-methods/Overloading.cs" />

      <h2>params: any number of arguments</h2>
      <p>
        Mark the last parameter with <code>params</code> and callers can pass zero, one, or many
        values without building an array themselves.
      </p>
      <Source file="app/03-methods/Params.cs" />

      <h2>Optional and named arguments</h2>
      <p>
        Give a parameter a default value and callers may skip it. With{" "}
        <strong>named arguments</strong> (<code>name: value</code>) they can skip ahead or pass
        arguments in any order. Named arguments also make calls with many values easier to read.
      </p>
      <Source file="app/03-methods/NamedOptional.cs" />

      <h2>ref and out</h2>
      <p>
        Arguments are normally copied into the method. <code>ref</code> passes the variable itself,
        so the method can change it. <code>out</code> is similar, but the method must assign it,
        which makes it a way to return a second value.
      </p>
      <Source file="app/03-methods/RefOut.cs" />
      <div className="tip">
        <p>
          Avoid <code>ref</code> and <code>out</code> in your own code: they make it hard to see
          what a method changes. The one common exception is the <strong>TryX pattern</strong>:
          return <code>true</code> or <code>false</code> for success, and put the result in an{" "}
          <code>out</code> parameter. <code>int.TryParse</code> works this way.
        </p>
      </div>

      <h2>Expression bodies and tuples</h2>
      <p>
        A method that is a single expression can use <code>{"=>"}</code> instead of braces and{" "}
        <code>return</code>. To return several values, return a <strong>tuple</strong>: a
        lightweight group of named values that callers can read by name or unpack into variables.
      </p>
      <Source file="app/03-methods/ExpressionBodied.cs" />

      <div className="aspnet">
        <p>
          Endpoints are methods, and their parameters are filled from the request. Optional
          parameters become optional query string values, so{" "}
          <code>GET /products?page=2</code> works and <code>GET /products</code> falls back to the
          defaults.
        </p>
        <Source
          title="Program.cs"
          code={`app.MapGet("/products", (int page = 1, int pageSize = 20) =>
    $"Page {page}, {pageSize} per page");`}
        />
      </div>

      <Quiz
        questions={[
          {
            q: "Which of these is part of a method's signature?",
            options: [
              "The return type",
              "The parameter types",
              "The method body",
            ],
            answer: 1,
            explanation: "A signature is the name plus the number and types of the parameters.",
          },
          {
            q: "How does `int.TryParse` report its result?",
            options: [
              "It throws an exception on failure",
              "It returns a tuple",
              "It returns a `bool` and puts the number in an `out` parameter",
            ],
            answer: 2,
            explanation: "This is the TryX pattern, the one common use of `out`.",
          },
          {
            q: "What does `params` on the last parameter let callers do?",
            options: [
              "Pass zero, one, or many values without building an array",
              "Pass arguments in any order",
              "Change the caller's variable",
            ],
            answer: 0,
            explanation: "The compiler builds the array for you.",
          },
        ]}
      />
    </>
  );
}
