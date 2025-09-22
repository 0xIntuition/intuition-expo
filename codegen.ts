import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'https://testnet.intuition.sh/v1/graphql',
  documents: ['./app/**/*.ts*'],
  ignoreNoDocuments: true,
  generates: {
    './lib/graphql/': {
      preset: 'client',
      config: {
        documentMode: 'string'
      }
    },
    './schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true
      }
    }
  }
}

export default config
