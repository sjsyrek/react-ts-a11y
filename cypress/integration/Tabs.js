describe("Tabs", () => {
  before(() => {
    cy.visit("/");
  });

  // We assume there is only one tabs component on the page
  describe("Precondition", () => {
    it("There are four tabs", () => {
      cy.get("body")
        .find("[role=tab]")
        .should("have.length", 4);
    });
    it("There are four panels", () => {
      cy.get("body")
        .find("[role=tabpanel]")
        .should("have.length", 4);
    });
    it("First tab is active", () => {
      cy.get("body")
        .find("[role=tab]")
        .first()
        .should("have.attr", "aria-selected", "true");
    });
    it("Only one tab is active", () => {
      cy.get("body")
        .find("[aria-selected=true]")
        .should("have.length", 1);
    });
    it("First panel is active", () => {
      cy.get("body")
        .find("[role=tabpanel]")
        .first()
        .should("not.have.attr", "hidden");
    });
    it("Only one panel is active", () => {
      cy.get("body")
        .find("[role=tabpanel]")
        .find("[hidden]")
        .should("have.length", 3);
    });
  });

  describe("Tab", () => {
    it("When focus moves into the tab list, places focus on the active tab element.", () => {
      cy.get("body").tab();
      cy.focused().contains("tab 1");
    });
    it("When the tab list contains the focus, moves focus to the next element in the tab sequence, which is the tabpanel element.", () => {
      cy.focused().tab();
      cy.focused().contains("content 1");
    });
  });

  describe("Right Arrow", () => {
    it("Moves focus to the next tab.", () => {
      cy.contains("tab 1").focus();
      cy.focused().type("{rightarrow}");
      cy.wait(100); // we need to wait to make sure React has enough time to switch focus
      cy.focused().contains("tab 2");
      // Activates the newly focused tab.
      cy.contains("content 2").should("not.have.attr", "hidden");
      cy.contains("content 1").should("have.attr", "hidden");
    });
    it("If focus is on the last tab, moves focus to the first tab.", () => {
      cy.contains("tab 4").focus();
      cy.focused().type("{rightarrow}");
      cy.wait(100); // we need to wait to make sure React has enough time to switch focus
      cy.focused().contains("tab 1");
      // Activates the newly focused tab.
      cy.contains("content 1").should("not.have.attr", "hidden");
      cy.contains("content 4").should("have.attr", "hidden");
    });
  });

  describe("Left Arrow", () => {
    it("Moves focus to the previous tab.", () => {
      cy.contains("tab 2").focus();
      cy.focused().type("{leftarrow}");
      cy.wait(100); // we need to wait to make sure React has enough time to switch focus
      cy.focused().contains("tab 1");
      // Activates the newly focused tab.
      cy.contains("content 1").should("not.have.attr", "hidden");
      cy.contains("content 2").should("have.attr", "hidden");
    });
    it("If focus is on the first tab, moves focus to the last tab.", () => {
      cy.contains("tab 1").focus();
      cy.focused().type("{leftarrow}");
      cy.wait(100); // we need to wait to make sure React has enough time to switch focus
      cy.focused().contains("tab 4");
      // Activates the newly focused tab.
      cy.contains("content 4").should("not.have.attr", "hidden");
      cy.contains("content 1").should("have.attr", "hidden");
    });
  });

  describe("Home", () => {
    xit("Moves focus to the first tab and activates it.", () => {
      cy.contains("tab 2").focus();
      cy.focused().type("{home}");
      cy.wait(100); // we need to wait to make sure React has enough time to switch focus
      cy.focused().contains("tab 1");
      // Activates the newly focused tab.
      cy.contains("content 1").should("not.have.attr", "hidden");
      cy.contains("content 2").should("have.attr", "hidden");
    });
  });

  describe("End", () => {
    xit("Moves focus to the last tab and activates it.", () => {
      cy.contains("tab 1").focus();
      cy.focused().type("{end}");
      cy.wait(100); // we need to wait to make sure React has enough time to switch focus
      cy.focused().contains("tab 4");
      // Activates the newly focused tab.
      cy.contains("content 4").should("not.have.attr", "hidden");
      cy.contains("content 1").should("have.attr", "hidden");
    });
  });

  describe("Delete", () => {
    it("When focus is on the tab, removes the tab from the tab list and places focus on the previous tab.", () => {
      cy.contains("tab 3").focus();
      cy.focused().type("{delete}");
      cy.wait(100); // we need to wait to make sure React has enough time to switch focus
      cy.focused().contains("tab 2");
      // Activates the newly focused tab.
      cy.contains("content 2").should("not.have.attr", "hidden");
      cy.get("body")
        .find("[role=tabpanel]")
        .should("have.length", 3);
      cy.get("body")
        .find("[role=tab]")
        .should("have.length", 3);
    });
  });
});
