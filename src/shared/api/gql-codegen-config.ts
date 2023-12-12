import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://docs.github.com/public/schema.docs.graphql",
  documents: ["src"],
  ignoreNoDocuments: true,
  generates: {
    "./schema.graphql": {
      plugins: ["schema-ast"],
    },
    "./src/shared/api/gql-generated/": {
      preset: "client",
    },
  },
};

export default config;
