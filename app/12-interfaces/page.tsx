import Figure from "../_lib/Figure";
import Quiz from "../_lib/Quiz";
import Source from "../_lib/Source";

export const metadata = { title: "12. Interfaces" };

export default function Page() {
  return (
    <>
      <h1>12. Interfaces</h1>
      <p>
        An <strong>interface</strong> is a contract: a list of members a class promises to have.
        It says <em>what</em> a class can do, never <em>how</em>. Code that depends on the
        contract works with any class that signs it.
      </p>

      <Figure
        src="interface-contract.png"
        alt="Different devices plugging into the same power outlet"
        caption="The outlet only cares about the plug shape, not the device behind it."
      />

      <h2>Declaring and implementing</h2>
      <p>
        Interface names start with <code>I</code> by convention. Members usually have no body and
        no access modifier: they are public by default. A class{" "}
        <strong>implements</strong> the interface with the same <code>:</code> syntax as
        inheritance, then provides every member.
      </p>
      <Source file="app/12-interfaces/Interfaces.cs" />
      <p>
        The variables are typed as <code>INotifier</code>, not as the concrete class. The calling
        code does not know, or care, whether an email or an SMS goes out.
      </p>

      <h2>Multiple interfaces</h2>
      <p>
        A class can inherit from only one class, but it can implement as many interfaces as it
        wants. Keep interfaces small and focused, then combine them.
      </p>
      <Source file="app/12-interfaces/MultipleInterfaces.cs" />
      <p>
        Through an <code>IReadable</code> variable you can only call <code>Read</code>. The
        interface limits what the caller sees, which is exactly what you want.
      </p>

      <h2>Polymorphism through interfaces</h2>
      <p>
        Just like base classes, interfaces let one loop drive many behaviors. Adding a new channel
        means adding a new class. The loop never changes.
      </p>
      <Source file="app/12-interfaces/Polymorphism.cs" />

      <h2>Interface or abstract class?</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Interface</th>
            <th>Abstract class</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Describes</td>
            <td>What a class can do</td>
            <td>What a class is</td>
          </tr>
          <tr>
            <td>How many per class</td>
            <td>Many</td>
            <td>One</td>
          </tr>
          <tr>
            <td>Instance fields</td>
            <td>No</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Constructors</td>
            <td>No</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Best for</td>
            <td>Swappable services, loose coupling</td>
            <td>Sharing code in a family of classes</td>
          </tr>
        </tbody>
      </table>
      <div className="tip">
        <p>
          Interfaces are not a way to reuse code. They are a way to <strong>decouple</strong> code:
          the caller depends on the contract, so the implementation can change without touching
          the caller. The next lesson shows why that matters so much.
        </p>
      </div>

      <div className="aspnet">
        <p>
          Almost every service in a Web API sits behind an interface: <code>IProductService</code>,{" "}
          <code>IEmailSender</code>, <code>IRepository</code>. Controllers ask for the interface,
          and the app decides which class to plug in at startup.
        </p>
        <Source
          title="Program.cs"
          code={`builder.Services.AddScoped<IEmailSender, SmtpEmailSender>();`}
        />
      </div>

      <Quiz
        questions={[
          {
            q: "How many interfaces can one class implement?",
            options: [
              "One",
              "Two",
              "As many as it wants",
            ],
            answer: 2,
            explanation: "A class has only one base class, but can implement many interfaces.",
          },
          {
            q: "What does an interface describe?",
            options: [
              "What a class can do, not how",
              "How a class stores its data",
              "Which base class to inherit from",
            ],
            answer: 0,
            explanation: "It is a contract; each implementing class decides how.",
          },
          {
            q: "Which of these can an abstract class have but an interface cannot?",
            options: [
              "Methods",
              "Instance fields and constructors",
              "Public members",
            ],
            answer: 1,
            explanation: "Interfaces are for decoupling, abstract classes for sharing code.",
          },
        ]}
      />
    </>
  );
}
