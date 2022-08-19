import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    'baseUrl': 'http://localhost:4200',
    'watchForFileChanges':false,
    'specPattern':['**/*.cy.js','**/*.cy.ts']
  },
  
});
