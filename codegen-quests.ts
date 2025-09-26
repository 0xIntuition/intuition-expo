import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'https://intuition-points-api-p74j.onrender.com/v1/graphql',
  documents: ['./lib/quests/**/*.ts*'],
  ignoreNoDocuments: true,
  generates: {
    './lib/quests/graphql/': {
      preset: 'client',
      config: {
        documentMode: 'string'
      }
    },
    './lib/quests/schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true
      }
    }
  }
}

export default config
