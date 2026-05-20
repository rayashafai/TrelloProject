import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import {addCucumberPreprocessorPlugin} from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";

export default defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    chromeWebSecurity: false,
    failOnStatusCode: false,

    async setupNodeEvents(on, config) {
      // Add cucumber plugin
      await addCucumberPreprocessorPlugin(on, config);

      // Use esbuild bundler
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      return config;
    },
   baseUrl: "https://trello.com/"
  },
});
