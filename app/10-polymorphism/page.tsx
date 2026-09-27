import Quiz from "../_lib/Quiz";
import Source from "../_lib/Source";

export const metadata = { title: "10. Method Overriding" };

export default function Page() {
  return (
    <>
      <h1>10. Method Overriding</h1>
      <p>
        <strong>Polymorphism</strong> means &quot;many forms&quot;: the same method call does
        different things depending on the actual object. In C# you get it by{" "}
        <strong>overriding</strong> methods from a base class.
      </p>

      <h2>The problem</h2>
      <p>
        Without polymorphism, code that works with many kinds of shapes checks the type and
        branches. Every new shape means editing this <code>switch</code>, and every other{" "}
        <code>switch</code> like it.
      </p>
      <Source file="app/10-polymorphism/TypeSwitch.cs" />

      <h2>virtual and override</h2>
      <p>
        Mark a base method <strong>virtual</strong> to allow derived classes to replace it. A
        derived class replaces it with <strong>override</strong>. At runtime, C# calls the version
        that belongs to the real object, even through a base-type variable.
      </p>
      <Source file="app/10-polymorphism/Overriding.cs" />
      <ul>
        <li>
          <code>Canvas</code> knows only <code>Shape</code>. Add a <code>Hexagon</code> class and{" "}
          <code>Canvas</code> works with it without a single change.
        </li>
        <li>
          <code>Triangle</code> does not override, so it falls back to the base version.
        </li>
      </ul>

      <h2>Extending with base</h2>
      <p>
        An override can still run the original code by calling <code>base.Method()</code>. Use it
        to add behavior before or after, instead of replacing it completely.
      </p>
      <Source file="app/10-polymorphism/BaseCall.cs" />

      <h2>Overriding ToString</h2>
      <p>
        Every class inherits <code>ToString()</code> from <code>object</code>, and it is virtual. By
        default it prints the type name. Override it to get useful text, which is also what{" "}
        <code>Console.WriteLine</code> and string interpolation use.
      </p>
      <Source file="app/10-polymorphism/ToString.cs" />
      <div className="tip">
        <p>
          Forgetting <code>virtual</code> on the base method means the derived method only{" "}
          <em>hides</em> it. Calls through a base-type variable then run the base version. The
          compiler warns you (CS0108) when this happens.
        </p>
      </div>

      <div className="aspnet">
        <p>
          You override framework methods to customize behavior. The most common one configures how
          Entity Framework maps your classes to database tables:
        </p>
        <Source
          title="AppDbContext.cs"
          code={`protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Product>()
        .Property(p => p.Name)
        .HasMaxLength(100);
}`}
        />
      </div>

      <Quiz
        questions={[
          {
            q: "What does marking a base method `virtual` allow?",
            options: [
              "Derived classes can replace it with `override`",
              "Calling it without an object",
              "Nothing can change it",
            ],
            answer: 0,
            explanation: "At runtime C# calls the version of the real object, even through a base-type variable.",
          },
          {
            q: "How can an override still run the original code?",
            options: [
              "Copy the base code into it",
              "Call `base.Method()`",
              "Call `this.Method()`",
            ],
            answer: 1,
            explanation: "Use it to add behavior before or after instead of replacing it.",
          },
          {
            q: "The base method is not `virtual`, and a derived class declares a method with the same name. What happens?",
            options: [
              "It overrides the base method anyway",
              "Nothing: both run on every call",
              "It only hides it, so calls through a base-type variable run the base version",
            ],
            answer: 2,
            explanation: "Without `virtual` and `override`, the method is hidden, not overridden.",
          },
        ]}
      />
    </>
  );
}
