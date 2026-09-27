import Source from "../_lib/Source";

export const metadata = { title: "08. protected & base" };

export default function Page() {
  return (
    <>
      <h1>08. protected & base</h1>
      <p>
        Inheritance adds two questions: which members can a derived class see, and how does the
        base class get constructed? This lesson answers both.
      </p>

      <h2>All access modifiers</h2>
      <p>
        Besides <code>public</code> and <code>private</code>, C# has modifiers for derived classes
        and for <strong>assemblies</strong> (a project, compiled into one <code>.dll</code>).
      </p>
      <table>
        <thead>
          <tr>
            <th>Modifier</th>
            <th>Accessible from</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>public</code></td>
            <td>Everywhere</td>
          </tr>
          <tr>
            <td><code>private</code></td>
            <td>The same class only</td>
          </tr>
          <tr>
            <td><code>protected</code></td>
            <td>The same class and its derived classes</td>
          </tr>
          <tr>
            <td><code>internal</code></td>
            <td>The same assembly (project)</td>
          </tr>
          <tr>
            <td><code>protected internal</code></td>
            <td>The same assembly, or derived classes anywhere</td>
          </tr>
          <tr>
            <td><code>private protected</code></td>
            <td>Derived classes in the same assembly</td>
          </tr>
        </tbody>
      </table>
      <p>
        In practice you use the first four. Classes are <code>internal</code> by default, members
        are <code>private</code> by default.
      </p>

      <h2>protected</h2>
      <p>
        A <strong>protected</strong> member is hidden from the outside world but visible to derived
        classes. It lets a base class share helpers with its children without making them public.
      </p>
      <Source file="app/08-protected-base/Protected.cs" />
      <div className="tip">
        <p>
          Use <code>protected</code> sparingly. It exposes implementation details to every derived
          class, which couples them tightly to the base. Prefer <code>private</code> until a child
          truly needs access.
        </p>
      </div>

      <h2>Constructors run base first</h2>
      <p>
        Constructors are <strong>not</strong> inherited. When you create a derived object, the base
        class constructor runs first, then the derived one. The base part of the object must be
        ready before the child builds on it.
      </p>
      <Source file="app/08-protected-base/ConstructorOrder.cs" />

      <h2>Passing arguments with base</h2>
      <p>
        If the base constructor needs arguments, the derived constructor must pass them with{" "}
        <code>: base(...)</code>. Without it, the code does not compile.
      </p>
      <Source file="app/08-protected-base/Base.cs" />
      <p>With primary constructors, the arguments go right after the base class name:</p>
      <Source file="app/08-protected-base/PrimaryBase.cs" />

      <div className="aspnet">
        <p>
          Your Entity Framework database context passes its options to the <code>DbContext</code>{" "}
          base class this way. In larger solutions, mark implementation classes{" "}
          <code>internal</code> so other projects can only use their public interfaces.
        </p>
        <Source
          title="AppDbContext.cs"
          code={`public class AppDbContext(DbContextOptions<AppDbContext> options)
    : DbContext(options)
{
    public DbSet<Product> Products => Set<Product>();
}`}
        />
      </div>
    </>
  );
}
