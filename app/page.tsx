import Link from "next/link";
import { lessons } from "./_lib/lessons";
import PixelTitle from "./_lib/PixelTitle";
import Source from "./_lib/Source";

export default function Home() {
  return (
    <>
      <p className="announce">
        <span className="pill">Part 2</span> Intermediate · classes, interfaces, and OOP for ASP.NET Core
      </p>

      <PixelTitle lines={["learn c# oop", "in y minutes"]} label="Learn C# OOP in Y minutes" />
      <p className="lead">
        Nineteen short lessons on object-oriented C#, ending with a bridge to ASP.NET
        Core: generics, records, exceptions, LINQ, async, and a working Web API. Each
        lesson explains an idea briefly, shows a small program, and prints its output.
      </p>

      <ul className="checks">
        <li>Runnable with dotnet run</li>
        <li>Modern C# 14</li>
        <li>Built toward Web APIs</li>
      </ul>

      <Source title="Run any example" lang="bash" code="dotnet run app/01-classes/Classes.cs" />

      <ol className="steps">
        {lessons.map((l, i) => (
          <li key={l.slug}>
            <span className="step-num">{i + 1}</span>
            <Link href={`/${l.slug}`}>{l.title}</Link>
            <p>{l.blurb}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
