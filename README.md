# typed-cookies 🍪

A type-safe cookie management library for Next.js applications with Zod schema validation.

> This library is a work in progress. The final goal is to also support cookie categories and not create specific cookies when a category is not accepted by the user.

## Features

- 🔒 **Type-safe**: Full TypeScript support with type inference
- 📝 **Schema validation**: Built-in Zod schema support
- ⚡ **Next.js ready**: Seamless integration with Next.js server components
- 🎯 **Zero dependencies**: Only peer dependencies on Next.js and Zod
- 💡 **Simple API**: Intuitive methods for cookie management

## Installation

```bash
npm install typed-cookies zod
# or
yarn add typed-cookies zod
# or
pnpm add typed-cookies zod
```

## Usage

### 1. Define your cookies

```typescript
import { z } from "zod";
import { createCookies } from "typed-cookies/next";

const cookies = createCookies({
  theme: {
    category: "preferences",
    type: "string",
    schema: z.enum(["light", "dark"]),
  },
  user: {
    category: "essential",
    type: "json",
    schema: z.object({
      id: z.string(),
      name: z.string(),
    }),
  },
});
```

### 2. Use in your Next.js server components

```typescript
export default async function Page() {
  const store = await cookies();

  // Get a cookie
  const theme = store.get("theme"); // type: 'light' | 'dark' | undefined

  // Set a cookie
  store.set("theme", "dark");

  // Check if cookie exists
  const hasUser = store.has("user");

  // Get all cookies
  const allCookies = store.getAll();

  // Delete a cookie
  store.delete("user");

  return <div>...</div>;
}
```

## API Reference

### `createCookies(definitions)`

Creates a typed cookie store with the specified definitions.

#### Cookie Definition Options

- `category`: String identifier for cookie category
- `type`: Either `'string'` or `'json'`
- `schema`: Optional Zod schema for validation

#### Cookie Store Methods

- `size`: Number of cookies in store
- `has(key)`: Check if cookie exists
- `get(key)`: Get cookie value with type inference
- `getAll()`: Get all cookie values
- `set(key, value)`: Set cookie value
- `delete(key)`: Delete cookie
- `toString()`: Get string representation of cookies

## Type Inference

The library provides several utility types:

```typescript
import type {
  Cookies,
  CookieDefinition,
  Definitions,
  InferCookiesCategories,
  InferCookiesKeys,
  InferCookieValue,
} from "typed-cookies";
```

## Requirements

- Next.js 15.1.3 or higher
- Zod 3.24.1 or higher

## License

MIT
