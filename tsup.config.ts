import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/next.ts"],
  format: ["esm", "cjs"],
  dts: true,
  external: ["next", "zod"],
  clean: true,
});
