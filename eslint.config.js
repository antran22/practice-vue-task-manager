import eslint from "@eslint/js";
import { fixupPluginRules } from "@eslint/compat";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import pluginImport from "eslint-plugin-import";
import playwrightConfig from "eslint-plugin-playwright";

export default tseslint.config(
  {
    ignores: ["*", "!src", "!test"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    name: "Vue files",
    plugins: {
      "typescript-eslint": tseslint.plugin,
    },
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        project: "./tsconfig.app.json",
        extraFileExtensions: [".vue"],
        sourceType: "module",
      },
    },
  },
  {
    name: "Test files",
    plugins: {
      "typescript-eslint": tseslint.plugin,
    },
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        project: "./tsconfig.vitest.json",
        sourceType: "module",
      },
    },
  },
  {
    files: ["e2e/**/*.{test,spec}.{js,ts,jsx,tsx}"],
    extends: [playwrightConfig.configs["flat/recommended"]],
    plugins: {
      "typescript-eslint": tseslint.plugin,
    },
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        project: "./tsconfig.node.json",
        sourceType: "module",
      },
    },
  },
  eslintPluginPrettierRecommended,
  {
    rules: {
      "prettier/prettier": [
        "error",
        {},
        {
          usePrettierrc: false,
        },
      ],
    },
  },

  {
    plugins: {
      import: fixupPluginRules(pluginImport),
    },
    rules: {
      "import/group-exports": "error",
      "import/exports-last": "error",
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
          groups: [
            "builtin", // Built-in types are first
            "object",
            "external",
            "index", // Then the index file
            ["sibling", "parent"], // Then sibling and parent types. They can be mingled together
            "internal",
          ],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
            },
          ],
        },
      ],
    },
    settings: {
      "import/resolver": {
        node: {
          paths: ["src"],
          moduleDirectory: ["node_modules", "src/"],
          extensions: [".js", ".jsx", ".ts", ".d.ts", ".tsx"],
        },
        typescript: {
          project: "./tsconfig.json",
        },
        alias: {
          map: [["@", "./src"]],
          extensions: [".ts", ".json", ".js", ".vue"],
        },
      },
    },
  },
);
