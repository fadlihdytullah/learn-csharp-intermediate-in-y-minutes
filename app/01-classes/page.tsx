import Quiz from "../_lib/Quiz";
import Source from "../_lib/Source";

export const metadata = { title: "01. Classes & Objects" };

export default function Page() {
  return (
    <>
      <h1>01. Classes & Objects</h1>
      <p>
        A <strong>class</strong> is a blueprint. An <strong>object</strong> is one thing built from
        that blueprint. Almost everything in a C# application, including every part of a Web API, is
        a class.
      </p>

      <h2>Fields and methods</h2>
      <p>
        A class combines data and behavior. <strong>Fields</strong> hold the data.{" "}
        <strong>Methods</strong> are the behavior: functions that belong to the class and can use its
        fields. You create an object with <code>new</code>, then reach its members with a dot.
      </p>
      <Source file="app/01-classes/Classes.cs" />
      <p>
        The file starts with top-level statements that use the class. The class itself is declared
        below them. This is the layout every example in this course uses.
      </p>

      <h2>Every object has its own data</h2>
      <p>
        Each <code>new</code> creates a separate object in memory, called an{" "}
        <strong>instance</strong>. Changing one instance does not touch another.
      </p>
      <Source file="app/01-classes/Objects.cs" />

      <h2>Instance vs static</h2>
      <p>
        Normal members belong to each object. A <strong>static</strong> member belongs to the class
        itself: there is only one copy, shared by everyone. You call it on the class name, not on an
        object.
      </p>
      <Source file="app/01-classes/Static.cs" />
      <ul>
        <li>
          <code>Count</code> is static: one counter for the whole program.
        </li>
        <li>
          <code>Create</code> is a static method: you call it before any object exists. Methods like{" "}
          <code>int.Parse</code> and <code>Console.WriteLine</code> are static for the same reason.
        </li>
        <li>
          <code>Introduce</code> is an instance method: it needs a specific person.
        </li>
      </ul>

      <h2>The this keyword</h2>
      <p>
        Inside an instance method, <code>this</code> means the current object. You rarely need to
        write it, but returning <code>this</code> lets callers chain method calls.
      </p>
      <Source file="app/01-classes/This.cs" />

      <div className="aspnet">
        <p>
          Controllers and services are classes. ASP.NET Core usually creates a new instance for each
          HTTP request, so instance fields do not survive between requests. Static fields do, and
          they are shared by every request at the same time. Avoid static state in a Web API: it
          leaks data between users and breaks under load.
        </p>
      </div>

      <Quiz
        questions={[
          {
            q: "What does a `static` member belong to?",
            options: [
              "Each object separately",
              "The class itself, shared by everyone",
              "Only the first object created",
            ],
            answer: 1,
            explanation: "There is only one copy, and you call it on the class name.",
          },
          {
            q: "Inside an instance method, what does `this` refer to?",
            options: [
              "The current object",
              "The class itself",
              "The method's return value",
            ],
            answer: 0,
            explanation: "Returning `this` lets callers chain method calls.",
          },
          {
            q: "Why should a Web API avoid static fields?",
            options: [
              "They are slower than instance fields",
              "They cannot hold strings",
              "They are shared by every request and leak data between users",
            ],
            answer: 2,
            explanation: "Controllers are created per request, but static state lives for the whole app.",
          },
        ]}
      />
    </>
  );
}
