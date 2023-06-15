# Immut

A draft-based immutable data library based on [Immer](https://github.com/immerjs/immer)

[View the docs](https://solarhorizon.github.io/immut)

# TypeScript Usage

```ts
import Immut, { nothing, produce } from "@rbxts/immut";

let oldState: Array<string> | undefined;
const newState = produce(oldState, (draft) => {
    if (!draft) return [];

    // draft.includes(), draft.indexOf() NOT allowed as they compile to table.find, which is not draft-safe
    // index starts at 1 for draft-safe table functions!
    if (Immut.table.find(draft, "abc") !== undefined) return nothing;
    if (Immut.table.find(draft, "abc") === 1) return nothing;

    // draft.push(), draft.insert(), draft.unshift() NOT allowed as they compile to table.insert, which is not draft-safe
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

    // draft.join() NOT allowed as it compiles to table.concat, which is not draft-safe
    Immut.table.concat(draft, ",");

    // draft.move() NOT allowed as it compiles to table.concat, which is not draft-safe
    // there are no draft-safe alternatives for draft.move(). consider using original() or current(), or manually move values over
});

const oldMapState = new Map<string, number>();
const newMapState = produce(oldMapState, (draft) => {
    // draft.clear() NOT allowed as it compiles to table.clear, which is not draft-safe
    Immut.table.clear(draft);

    if (draft.get("foo") === undefined) draft.set("foo", 1);
});

const oldSetState = new Set<string>();
const newSetState = produce(oldSetState, (draft) => {
    // draft.clear() NOT allowed as it compiles to table.clear, which is not draft-safe
    Immut.table.clear(draft);

    if (!draft.has("foo")) draft.add("foo");
});
```
