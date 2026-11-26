import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    // the tsconfig "@/*" path
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  // Next's tsconfig keeps JSX as is ("preserve"); the tests compile it with React's automatic runtime
  esbuild: { jsx: "automatic" },
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"],
    restoreMocks: true,
  },
});
