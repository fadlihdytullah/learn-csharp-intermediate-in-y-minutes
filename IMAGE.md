# Images

Only concepts that are easier to see than to read get an image. Diagrams that must be exact (class hierarchies, the HTTP request pipeline) are drawn in code on the page instead.

## Shared style (paste before every prompt)

> Minimal flat vector illustration, thin uniform line art, mostly neutral gray strokes (#8f8f8f) with a single soft indigo accent (#7d8cff) used only on the key element. Transparent background, no gradients, no shadows, no 3D. Clean, calm, generous whitespace, like a modern developer-docs illustration. Any labels are short, lowercase, in a clean monospace font. 16:9, 1600x900 px.

## How to use

1. Open ChatGPT (image generation), paste the shared style, then the prompt for one image.
2. Download as PNG with a transparent background.
3. Save it with the exact file name into `public/images/`.
4. Reload the lesson. The placeholder is replaced by your image (after `pnpm build` in production).

## 1. `is-a-vs-has-a.png`

Used in: lesson 07, Composition.

> Two side-by-side panels. Left panel titled "inheritance: is-a": a family-tree style diagram with "vehicle" at the top and "car" and "truck" below it, connected by lines. Right panel titled "composition: has-a": a car drawn as an assembly of separate parts (engine, wheels, radio), each part slightly separated like an exploded view, with the engine highlighted in the indigo accent. Conveys: inheritance is a family relationship, composition is building from parts.

## 2. `interface-contract.png`

Used in: lesson 12, Interfaces.

> A single wall power outlet in the center, drawn in the indigo accent, labeled "interface". Three different devices plug into it with the same plug shape: a lamp, a laptop charger, and a kettle, each labeled "class". Conveys: the outlet only cares about the plug shape (the contract), not which device is behind it.

## 3. `dependency-injection.png`

Used in: lesson 13, Dependency Injection.

> Two side-by-side kitchen scenes. Left panel titled "without di": a stressed chef is also growing vegetables, milking a cow, and building an oven, all at once. Right panel titled "with di": a calm chef cooks at the stove while a delivery person hands over a crate labeled "ingredients" through a door; the crate is in the indigo accent. Conveys: a class should receive what it needs instead of creating it.

## 4. `async-waiter.png`

Used in: lesson 18, Async & Await.

> Two side-by-side restaurant scenes. Left panel titled "synchronous": a waiter stands frozen next to the kitchen window, waiting for one dish, while a line of customers waits unserved behind them. Right panel titled "asynchronous": the same waiter hands a ticket to the kitchen, then moves on taking orders at other tables; a small bell in the indigo accent rings at the kitchen window when the dish is ready. Conveys: await frees you to do other work while waiting.
