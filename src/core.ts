import type { z } from "zod";

export type CookieDefinition = {
  category: string;
  type: "string" | "json";
  schema?: z.ZodType;
};

export type Definitions = Record<string, CookieDefinition>;

export type InferCookieTypeFromDef<
  TDef extends Definitions,
  TKey extends keyof TDef
> = TDef[TKey]["type"];

export type InferCookieValueFromDef<
  TDef extends Definitions,
  TKey extends keyof TDef
> = TDef[TKey]["schema"] extends z.ZodType
  ? z.infer<TDef[TKey]["schema"]>
  : InferCookieTypeFromDef<TDef, TKey> extends "string"
  ? string
  : unknown;

export type InferCookiesKeys<TCookies> = TCookies extends Cookies<infer TDef>
  ? keyof TDef
  : never;

export type InferCookiesCategories<TCookies> = TCookies extends Cookies<
  infer TDef
>
  ? { [K in keyof TDef]: TDef[K]["category"] }[keyof TDef]
  : never;

export type InferCookieValue<
  TCookies,
  TKey extends InferCookiesKeys<TCookies>
> = TCookies extends Cookies<infer TDef>
  ? InferCookieValueFromDef<TDef, TKey>
  : never;

export type Cookies<TDef extends Definitions> = () => Promise<{
  _def: TDef;
  readonly size: number;
  has: <T extends keyof TDef>(key: T) => boolean;
  get: <T extends keyof TDef>(
    key: T
  ) => InferCookieValueFromDef<TDef, T> | undefined;
  getAll: () => {
    [K in keyof TDef]: InferCookieValueFromDef<TDef, K> | undefined;
  };
  set: <T extends keyof TDef>(
    key: T,
    value: InferCookieValueFromDef<TDef, T>
  ) => void;
  delete: <T extends keyof TDef>(key: T) => void;
  toString: () => string;
}>;
