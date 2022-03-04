const coveragePlugin = require('@cypress/code-coverage/task');

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  config = coveragePlugin(on, config);
  return config;
};
