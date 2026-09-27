import Figure from "../_lib/Figure";
import Source from "../_lib/Source";

export const metadata = { title: "18. Async & Await" };

export default function Page() {
  return (
    <>
      <h1>18. Async & Await</h1>
      <p>
        Most of the time a backend is not computing. It is <strong>waiting</strong>: for a
        database, a file, another API. <strong>Asynchronous</strong> code lets a thread do other
        work during that wait instead of sitting idle. In C# you write it with{" "}
        <code>async</code> and <code>await</code>.
      </p>

      <Figure
        src="async-waiter.png"
        alt="A waiter frozen at the kitchen window versus a waiter serving other tables while the food cooks"
        caption="A good waiter hands the order to the kitchen and keeps serving. That is await."
      />

      <h2>Task, async, and await</h2>
      <p>
        A <strong>Task</strong> represents work that will finish later. <code>Task&lt;T&gt;</code>{" "}
        finishes with a value of type <code>T</code>. Mark a method <code>async</code> and you can
        use <code>await</code> inside it, which pauses the method until the task completes,
        without blocking the thread.
      </p>
      <Source file="app/18-async/AsyncAwait.cs" />
      <ul>
        <li>
          <code>Task.Delay</code> stands in for real I/O, like a database query.
        </li>
        <li>
          Async methods return <code>Task</code> or <code>Task&lt;T&gt;</code> and, by convention,
          end in <code>Async</code>.
        </li>
        <li>
          Calling an async method starts it. Awaiting it later picks up the result, so you can do
          other work in between.
        </li>
      </ul>

      <h2>Running tasks at the same time</h2>
      <p>
        Awaiting one call after another waits for each in turn. When the calls do not depend on
        each other, start them all and wait once with <code>Task.WhenAll</code>.
      </p>
      <Source file="app/18-async/WhenAll.cs" />

      <h2>Cancellation</h2>
      <p>
        A <strong>CancellationToken</strong> lets the caller say &ldquo;stop, I no longer need
        this&rdquo;. Pass it down to every async call. Here the token cancels itself after 250 ms.
      </p>
      <Source file="app/18-async/Cancellation.cs" />

      <h2>Rules of thumb</h2>
      <ul>
        <li>
          <strong>Async all the way.</strong> If a method awaits something, make it async too,
          up through every caller.
        </li>
        <li>
          <strong>Never block on a task</strong> with <code>.Result</code> or <code>.Wait()</code>.
          It freezes the thread you were trying to free, and can deadlock.
        </li>
        <li>
          <strong>Avoid <code>async void</code>.</strong> Nobody can await it, and its exceptions
          crash the process. Return <code>Task</code> instead.
        </li>
      </ul>
      <Source
        title="Avoid"
        code={`var user = GetUserAsync(42).Result;

async void SaveAsync() { await db.SaveChangesAsync(); }`}
      />
      <Source
        title="Prefer"
        code={`var user = await GetUserAsync(42);

async Task SaveAsync() { await db.SaveChangesAsync(); }`}
      />

      <div className="aspnet">
        <p>
          A web server handles many requests with a small pool of threads. While one request
          awaits the database, its thread serves other requests, so the same server handles far
          more traffic. That is why endpoints, controllers, and EF Core calls are async, and why
          ASP.NET Core hands you a <code>CancellationToken</code> that fires when the client
          disconnects.
        </p>
        <Source
          title="ProductsEndpoint.cs"
          code={`app.MapGet("/products", async (AppDbContext db, CancellationToken cancellationToken) =>
    await db.Products.ToListAsync(cancellationToken));`}
        />
      </div>
    </>
  );
}
