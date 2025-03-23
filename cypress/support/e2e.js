require('./commands');
require('cypress-mochawesome-reporter/register');
import 'cypress-real-events/support';


// Hide XHR requests from command log
const app = window.top;
if (app && app.console) {
  app.console.log = () => {};
}

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
}); 