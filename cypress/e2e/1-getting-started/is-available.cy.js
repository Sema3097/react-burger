const { testURL } = require("../../support/data");

describe('service is available', function() {
    it('should be available on localhost:3000', function() {
      cy.visit(testURL);
    });
  }); 