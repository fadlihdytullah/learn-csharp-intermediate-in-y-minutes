import Source from "../_lib/Source";

const boxes = [
  { x: 1, label: "Client", sub: "curl" },
  { x: 133, label: "Middleware", sub: "errors, auth" },
  { x: 265, label: "Routing", sub: "/products/3" },
  { x: 397, label: "Endpoint", sub: "MapGet" },
  { x: 529, label: "Service", sub: "via DI" },
  { x: 661, label: "Data", sub: "in memory" },
];

export const metadata = { title: "19. Your First Web API" };

export default function Page() {
  return (
    <>
      <h1>19. Your First Web API</h1>
      <p>
        Time to put everything together. A <strong>Web API</strong> is a program that listens for
        HTTP requests and answers with data, usually JSON. With .NET 10 you can build a real one in
        a single file and run it with the same <code>dotnet run</code> you have used all along.
      </p>

      <h2>The request pipeline</h2>
      <p>
        Every request travels through the same path. <strong>Middleware</strong> handles
        cross-cutting jobs like error handling and authentication. <strong>Routing</strong>{" "}
        matches the URL to an <strong>endpoint</strong>, your handler. The endpoint asks a service
        for the data, and the result travels back as JSON.
      </p>
      <figure className="figure">
        <svg
          viewBox="0 0 760 150"
          role="img"
          aria-label="A request flows from the client through middleware, routing, the endpoint, a service, and data, then the response flows back to the client"
        >
          <g fill="none" stroke="currentColor" strokeWidth="1.2">
            {boxes.map((b) => (
              <rect
                key={b.label}
                x={b.x}
                y="40"
                width="98"
                height="50"
                rx="8"
                stroke={b.label === "Endpoint" ? "var(--accent)" : undefined}
              />
            ))}
            <path d="M101 65h28m-6-4 6 4-6 4M233 65h28m-6-4 6 4-6 4M365 65h28m-6-4 6 4-6 4M497 65h28m-6-4 6 4-6 4M629 65h28m-6-4 6 4-6 4" />
            <path d="M710 90v30H50v-26m-4 6 4-6 4 6" />
          </g>
          <g fill="currentColor" textAnchor="middle">
            {boxes.map((b) => (
              <g key={b.label}>
                <text x={b.x + 49} y="62" fontSize="13" fill="var(--fg)">
                  {b.label}
                </text>
                <text x={b.x + 49} y="79" fontSize="12">
                  {b.sub}
                </text>
              </g>
            ))}
            <text x="380" y="26" fontSize="12">
              request
            </text>
            <text x="380" y="140" fontSize="12">
              response (JSON)
            </text>
          </g>
        </svg>
      </figure>

      <h2>The whole API</h2>
      <p>
        Three endpoints: list all products, get one by id, and create a new one. The output below
        is a real terminal session against the running app.
      </p>
      <Source file="app/19-web-api/WebApi.cs" />
      <p>Every piece is something you already know:</p>
      <ul>
        <li>
          <code>Product</code> and <code>CreateProductRequest</code> are <strong>records</strong>{" "}
          used as DTOs (lesson 15). ASP.NET Core turns them into JSON and back.
        </li>
        <li>
          <code>IProductStore</code> is an <strong>interface</strong> registered in the{" "}
          <strong>DI container</strong> (lessons 12 and 13). Endpoints just ask for it as a
          parameter.
        </li>
        <li>
          Handlers are <strong>async lambdas</strong> returning tasks (lessons 17 and 18).
        </li>
        <li>
          <code>OrderBy</code>, <code>FirstOrDefault</code>, and <code>Max</code> are{" "}
          <strong>LINQ</strong> (lesson 17). <code>Task&lt;List&lt;Product&gt;&gt;</code> is{" "}
          <strong>generics</strong> (lesson 14).
        </li>
        <li>
          <code>Product?</code> plus <code>is null</code> is <strong>null safety</strong> deciding
          between <code>200 OK</code> and <code>404 Not Found</code> (lesson 15).
        </li>
      </ul>

      <h2>Run it</h2>
      <p>
        The two <code>#:</code> lines at the top switch the file to the Web SDK. Start the server
        in one terminal, then call it from a second one:
      </p>
      <Source
        title="Terminal"
        lang="bash"
        code={`dotnet run app/19-web-api/WebApi.cs

curl localhost:5000/products`}
      />
      <p>
        Press <code>Ctrl+C</code> to stop the server. Products you add disappear on restart,
        because they only live in memory.
      </p>
      <div className="tip">
        <p>
          A <code>List</code> inside a singleton is fine for learning, but it is not safe when
          many requests write at the same time. Real APIs store data in a database, usually
          through EF Core.
        </p>
      </div>

      <h2>The same API with controllers</h2>
      <p>
        What you wrote above is a <strong>minimal API</strong>. The other common style groups
        endpoints into a <strong>controller</strong> class, with attributes for routes. Both run on
        the same framework, and many courses and companies use controllers. Create a project with{" "}
        <code>dotnet new webapi --use-controllers</code>.
      </p>
      <Source
        title="Controllers/ProductsController.cs"
        code={`[ApiController]
[Route("products")]
public class ProductsController(IProductStore store) : ControllerBase
{
    [HttpGet]
    public async Task<List<Product>> GetAll() => await store.GetAllAsync();

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Product>> Get(int id)
    {
        var product = await store.GetAsync(id);
        if (product is null) return NotFound();
        return product;
    }

    [HttpPost]
    public async Task<ActionResult<Product>> Create(CreateProductRequest request)
    {
        var product = await store.AddAsync(request);
        return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
    }
}`}
      />
      <Source
        title="Program.cs"
        code={`builder.Services.AddControllers();
builder.Services.AddSingleton<IProductStore, InMemoryProductStore>();

var app = builder.Build();
app.MapControllers();
app.Run();`}
      />

      <h2>What&apos;s next</h2>
      <p>You now have the C# to learn ASP.NET Core properly. Topics to tackle, roughly in order:</p>
      <ol>
        <li>
          <strong>Routing</strong>: route parameters, constraints, and route groups.
        </li>
        <li>
          <strong>Model binding and validation</strong>: reading from the body, query, and headers,
          and rejecting bad input.
        </li>
        <li>
          <strong>EF Core</strong>: a real database, migrations, and async LINQ queries.
        </li>
        <li>
          <strong>Authentication and authorization</strong>: JWT bearer tokens and policies.
        </li>
        <li>
          <strong>Testing</strong>: unit tests with fakes, and integration tests with{" "}
          <code>WebApplicationFactory</code>.
        </li>
      </ol>

      <div className="aspnet">
        <p>
          <code>dotnet new webapi</code> gives you this same structure as a full project, plus
          OpenAPI documentation and configuration in <code>appsettings.json</code>. The concepts
          do not change: records for data, interfaces behind DI, async all the way, and LINQ for
          queries.
        </p>
      </div>
    </>
  );
}
