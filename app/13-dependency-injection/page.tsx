import Figure from "../_lib/Figure";
import Quiz from "../_lib/Quiz";
import Source from "../_lib/Source";

export const metadata = { title: "13. Dependency Injection" };

export default function Page() {
  return (
    <>
      <h1>13. Dependency Injection</h1>
      <p>
        A <strong>dependency</strong> is any object a class needs to do its job.{" "}
        <strong>Dependency injection (DI)</strong> means the class receives its dependencies from
        outside, usually through the constructor, instead of creating them itself. Combined with
        interfaces, this makes code easy to test and easy to extend.
      </p>

      <Figure
        src="dependency-injection.png"
        alt="A chef growing their own vegetables versus a chef receiving a delivery"
        caption="A class should receive what it needs, not build it."
      />

      <h2>The problem: tight coupling</h2>
      <p>
        This <code>OrderProcessor</code> creates its own <code>ShippingCalculator</code>. It is{" "}
        <strong>tightly coupled</strong> to that exact class: you cannot test the processor
        without also running the real calculator, and you cannot swap in another one without
        editing the processor.
      </p>
      <Source
        title="Tightly coupled"
        code={`class OrderProcessor
{
    private readonly ShippingCalculator calculator = new();

    public void Process(Order order) { ... }
}`}
      />

      <h2>Testability</h2>
      <p>
        Move the dependency to the constructor and type it as an interface. Now a test can pass a{" "}
        <strong>fake</strong> that always returns <code>1</code>, and check only the logic of{" "}
        <code>OrderProcessor</code> itself.
      </p>
      <Source file="app/13-dependency-injection/Testability.cs" />
      <p>
        These two checks are hand-rolled unit tests. Real projects use a test framework such as
        xUnit, but the idea is the same: isolate one class by faking what it depends on.
      </p>

      <h2>Extensibility</h2>
      <p>
        The same move makes code open to new behavior. <code>DbMigrator</code> only knows{" "}
        <code>ILogger</code>. To log to a file instead of the console you write a new class. You
        never touch <code>DbMigrator</code>.
      </p>
      <Source file="app/13-dependency-injection/Extensibility.cs" />
      <p>
        This is the <strong>open-closed principle</strong>: open for extension, closed for
        modification. Changing working code risks breaking it. Adding new code does not.
      </p>

      <h2>A DI container</h2>
      <p>
        Passing dependencies by hand gets tedious when objects need objects that need objects. A{" "}
        <strong>DI container</strong> does it for you. You <strong>register</strong> which class
        to use for each interface, then <strong>resolve</strong> the object you want. The
        container builds its whole dependency chain.
      </p>
      <Source file="app/13-dependency-injection/Container.cs" />
      <p>
        The <code>#:package</code> line pulls in Microsoft&apos;s container, the same one ASP.NET
        Core uses. Nobody wrote <code>new ShippingCalculator()</code>: the container saw the
        constructor parameter and supplied it.
      </p>

      <h2>Lifetimes</h2>
      <p>
        When you register a service you also choose how long each instance lives. A{" "}
        <strong>scope</strong> is a unit of work. In a Web API, one scope is one HTTP request.
      </p>
      <Source file="app/13-dependency-injection/Lifetimes.cs" />
      <table>
        <thead>
          <tr>
            <th>Lifetime</th>
            <th>One instance per</th>
            <th>Typical use</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>AddSingleton</code>
            </td>
            <td>Whole app</td>
            <td>Caches, configuration, stateless helpers</td>
          </tr>
          <tr>
            <td>
              <code>AddScoped</code>
            </td>
            <td>Request (scope)</td>
            <td>Database context, per-request services</td>
          </tr>
          <tr>
            <td>
              <code>AddTransient</code>
            </td>
            <td>Every request for it</td>
            <td>Lightweight, stateless services</td>
          </tr>
        </tbody>
      </table>
      <div className="tip">
        <p>
          Never inject a scoped service into a singleton. The singleton lives forever, so it would
          hold on to one request&apos;s object for every later request.
        </p>
      </div>

      <div className="aspnet">
        <p>
          DI is built into ASP.NET Core. You register services in <code>Program.cs</code>, and the
          framework injects them into controllers and endpoints for every request. The framework
          even brings its own <code>ILogger&lt;T&gt;</code>, so you rarely write a logger yourself.
        </p>
        <Source
          title="Program.cs"
          code={`builder.Services.AddScoped<IShippingCalculator, ShippingCalculator>();

app.MapPost("/orders", (Order order, IShippingCalculator calculator) =>
    new { Shipping = calculator.Calculate(order) });`}
        />
      </div>

      <Quiz
        questions={[
          {
            q: "What does dependency injection mean?",
            options: [
              "A class creates every object it needs itself",
              "A class receives its dependencies from outside, usually through the constructor",
              "A class inherits its dependencies from a base class",
            ],
            answer: 1,
            explanation: "Typed as interfaces, those dependencies can be faked in tests or swapped.",
          },
          {
            q: "Which lifetime gives one instance per HTTP request?",
            options: [
              "`AddSingleton`",
              "`AddTransient`",
              "`AddScoped`",
            ],
            answer: 2,
            explanation: "In a Web API, one scope is one request.",
          },
          {
            q: "Why should you never inject a scoped service into a singleton?",
            options: [
              "The singleton would keep one request's object for every later request",
              "It does not compile",
              "Scoped services cannot have constructors",
            ],
            answer: 0,
            explanation: "The singleton lives for the whole app, much longer than the scope.",
          },
        ]}
      />
    </>
  );
}
