import None from "./None";
import { Draft } from "./types-external";
import { Objectish } from "./types-internal";

export { default as None } from "./None";
export declare const nothing: typeof None;
export * as table from "./table";

export declare function createDraft<T extends Objectish>(base: T): Draft<T>;
export declare const current: typeof finishDraft;
export declare function finishDraft<T>(draft: Draft<T>): T;
export declare function isDraft(value: unknown): boolean;
export declare function isDraftable(value: unknown): boolean;
export declare function original<T>(draft: Draft<T>): T;
export declare function produce<T>(
	base: T,
	recipe: (draft: Draft<T>) => typeof draft | void | undefined | (T extends undefined ? typeof None : never),
): T;
