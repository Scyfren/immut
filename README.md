# Immut

A draft-based immutable data library based on [Immer](https://github.com/immerjs/immer)

[View the docs](https://solarhorizon.github.io/immut)

# TypeScript Usage

```ts
import Immut, { None, produce } from "@rbxts/immut";

let oldState: Array<string> | undefined;
const newState = produce(oldState, (draft) => {
    if (!draft) return [];
    if (draft.includes("foo")) return None;

    // draft.push(), draft.insert(), draft.unshift() NOT allowed as they compile to table.insert, which is not draft-safe
    Immut.table.insert(draft, "draft-safe");
    // index starts at 1 for draft-safe table functions!
    Immut.table.insert(draft, 1, "draft-safe");

    // draft.remove(), draft.shift() NOT allowed as they compile to table.remove, which is not draft-safe
    Immut.table.remove(draft);
    // index starts at 1 for draft-safe table functions!
    Immut.table.remove(draft, 1);

    draft.pop(); // allowed as it does not compile to table.remove: draft[#draft] = nil

    // draft.sort() NOT allowed as it compiles to table.sort, which is not draft-safe
    Immut.table.sort(draft, (a, b) => a > b);

    // draft.clear() NOT allowed as it compiles to table.clear, which is not draft-safe
    Immut.table.clear(draft);
});
```
