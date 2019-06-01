// Assumption:
// - there is only one tabs component on the page
// - there are four tabs in it (all visible): "tab 1", "tab 2", "tab 3", "tab 4"
// - there are four panels in it (first one visible): "content 1", "content 2", "content 3", "content 4"
// - there is a link in in first panel
// - there is a button after tabs component
describe("Tabs", () => {
  before(() => {
    cy.visit("/");
  });

  describe("Tab", () => {
    xit("When focus moves into the tab list, places focus on the active tab element .", () => {});
    xit("When the tab list contains the focus, moves focus to the next element in the tab sequence, which is the tabpanel element.", () => {});
  });

  describe("Right Arrow", () => {
    xit("Moves focus to the next tab.", () => {});
    xit("If focus is on the last tab, moves focus to the first tab.", () => {});
    xit("Activates the newly focused tab.", () => {});
  });

  describe("Left Arrow", () => {
    xit("Moves focus to the previous tab.", () => {});
    xit("If focus is on the first tab, moves focus to the last tab.", () => {});
    xit("Activates the newly focused tab.", () => {});
  });

  describe("Home", () => {
    xit("Moves focus to the first tab and activates it.", () => {});
  });

  describe("End", () => {
    xit("Moves focus to the last tab and activates it.", () => {});
  });

  describe("Delete", () => {
    xit("When focus is on the tab, removes the tab from the tab list and places focus on the previous tab.", () => {});
  });
});
