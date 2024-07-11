## Ref Doc on Front-end tooling and decisions

- Next.JS with Vitest:
  -A reliabe, robust and modern build system. Well known for its speed and stability.

- ReduxToolkit: simplies Redux state management by providing a set of tools and best practices: Built-in Middleware, Code Spliting & Typescript support.

- Redux EntityAdapters implementation: Enhances performance by using optimized data structures and algorithms for state updates, minimizing re-renders and improving application responsiveness.

- Enhanced, Mobile-first UI
  -Time invested in matching FACEIT visual system elements: Fonts, Colors and look and feel.
  -Micro animations/transitions added to improve user experience.
  -Skeleton-ui strategy for preloading experience.

- Unit testing and Snapshots

## How to run

### Step 1

```bash
npm install
npm run dev
```

### Step 2

Open [http://localhost:3000](http://localhost:3000) with your browser
<br/><br/>

## Run unit test & snapshots

```bash
npm run test
```

```bash
npm run test -- -u
```

(pending to add e2e testing)

## Run e2e test

```bash
npm run cy:open
```
