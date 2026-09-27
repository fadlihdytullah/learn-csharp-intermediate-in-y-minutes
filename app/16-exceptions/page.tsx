import Quiz from "../_lib/Quiz";
import Source from "../_lib/Source";

export const metadata = { title: "16. Exceptions" };

export default function Page() {
  return (
    <>
      <h1>16. Exceptions</h1>
      <p>
        An <strong>exception</strong> is an object that signals something went wrong: a file is
        missing, a string is not a number, a network call timed out. If nobody handles it, the
        program crashes. Handling exceptions lets you recover, or at least fail with a clear
        message.
      </p>

      <h2>try, catch, finally</h2>
      <p>
        Code that might fail goes in <code>try</code>. If it throws, execution jumps straight to
        a matching <code>catch</code>. The <code>finally</code> block runs either way, which makes
        it the place for cleanup.
      </p>
      <Source file="app/16-exceptions/TryCatch.cs" />
      <p>
        Note that <code>Quantity: ...</code> never prints. The line after the failing call is
        skipped.
      </p>

      <h2>Multiple catch blocks</h2>
      <p>
        Exceptions are classes in a hierarchy, all deriving from <code>Exception</code>. Catch
        blocks are checked top to bottom and the first match wins, so put specific types first and
        the general <code>Exception</code> last.
      </p>
      <Source file="app/16-exceptions/MultipleCatch.cs" />
      <p>
        Every exception has a <code>Message</code>, a <code>StackTrace</code> (where it happened),
        and an optional <code>InnerException</code> (what caused it).
      </p>

      <h2>Throwing and rethrowing</h2>
      <p>
        Use <code>throw</code> to raise an exception yourself. When you catch one only to add
        context, wrap it in a new exception and pass the original as the{" "}
        <strong>inner exception</strong>. Nothing is lost.
      </p>
      <Source file="app/16-exceptions/Rethrow.cs" />
      <p>
        To pass the same exception up unchanged, write <code>throw;</code> on its own inside the{" "}
        <code>catch</code>.
      </p>
      <div className="tip">
        <p>
          Never write <code>throw ex;</code>. It resets the stack trace, so the error appears to
          come from your <code>catch</code> block instead of where it really happened. The
          compiler warns about it with <code>CA2200</code>.
        </p>
      </div>

      <h2>Custom exceptions</h2>
      <p>
        Create your own exception by inheriting from <code>Exception</code>. The name documents
        the failure, and extra properties carry details the caller can use.
      </p>
      <Source file="app/16-exceptions/CustomException.cs" />
      <p>
        By convention the class name ends in <code>Exception</code>. Throwing early, before the
        balance changes, keeps the object in a valid state.
      </p>

      <h2>using and IDisposable</h2>
      <p>
        Objects that hold resources (files, database connections) implement{" "}
        <code>IDisposable</code>. A <code>using</code> declaration calls <code>Dispose</code>{" "}
        automatically when the variable goes out of scope, even when an exception is thrown. It
        is a <code>try/finally</code> written for you.
      </p>
      <Source file="app/16-exceptions/Using.cs" />

      <div className="aspnet">
        <p>
          In an API, expected problems are not exceptions: a missing product returns{" "}
          <code>404 Not Found</code>, bad input returns <code>400</code>. For the truly unexpected,
          one global handler turns any unhandled exception into a standard{" "}
          <strong>ProblemDetails</strong> JSON response with status <code>500</code>, instead of
          leaking a stack trace to the client.
        </p>
        <Source
          title="Program.cs"
          code={`builder.Services.AddProblemDetails();

var app = builder.Build();
app.UseExceptionHandler();

app.MapGet("/products/{id}", (int id, IProductStore store) =>
{
    var product = store.Find(id);
    return product is null ? Results.NotFound() : Results.Ok(product);
});`}
        />
      </div>

      <Quiz
        questions={[
          {
            q: "When does a `finally` block run?",
            options: [
              "Only if no exception was thrown",
              "Only after a `catch` runs",
              "Either way, exception or not",
            ],
            answer: 2,
            explanation: "That makes it the place for cleanup.",
          },
          {
            q: "In what order should you write `catch` blocks?",
            options: [
              "Specific types first, general `Exception` last",
              "General `Exception` first",
              "The order does not matter",
            ],
            answer: 0,
            explanation: "Catch blocks are checked top to bottom, and the first match wins.",
          },
          {
            q: "Why should you never write `throw ex;` in a `catch`?",
            options: [
              "It does not compile",
              "It resets the stack trace",
              "It swallows the exception",
            ],
            answer: 1,
            explanation: "Write `throw;` to pass the same exception up unchanged.",
          },
        ]}
      />
    </>
  );
}
