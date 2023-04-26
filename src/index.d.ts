import { Draft } from "./type-externals";
import { Objectish } from "./type-internals";

export declare function createDraft<T extends Objectish>(base: T): Draft<T>;
export declare const current: typeof finishDraft;
export declare function finishDraft<T>(draft: Draft<T>): T;
export declare function isDraft(value: unknown): boolean;
export declare function isDraftable(value: unknown): boolean;
export declare function original<T>(draft: Draft<T>): T;
export declare function produce<T>(base: T, recipe: (draft: Draft<T>) => typeof draft | void | undefined): T;
export declare function remove<T>(draft: Draft<Array<T>>, number?: number): T | undefined;
export declare function insert<T>(draft: Draft<Array<T>>, value: T): void;
export declare function insert<T>(draft: Draft<Array<T>>, pos: number, value: T): void;
