const CAREERS_LINK = "Careers",
  QA_AUTOMATION = "QA Automation Engineer",
  DEPARTMENT = "QA",
  QA_MANUAL = "QA Engineer";

const JOB_OFFER_LIST = ".job-offer__title",
  DEPARTMENTS_DROPDOWN = ".select--desktop";

describe("Check QA job offers on the 10Clouds website", () => {
  it("Open 10Clouds website and check if the career page has only one QA Automation offer", () => {
    let onePosition: boolean = false;
    cy.visit("");
    cy.contains(CAREERS_LINK).click();
    cy.get(JOB_OFFER_LIST).then((result) => {
      for (let index = 0; index < result.length; ++index) {
        let text = result[index].textContent;
        if (text.includes(QA_AUTOMATION)) {
          if (onePosition == false) {
            cy.log(`We have one QA Automation position: ${text}`);
            onePosition = true;
          } else {
            throw new Error("We have more then one QA Automation position");
          }
        }
      }
    });
  });

  it("Open 10Clouds website, use the QA filter and check the title of all results", () => {
    cy.visit("");
    cy.contains(CAREERS_LINK).click();
    cy.get(DEPARTMENTS_DROPDOWN).eq(0).click();
    cy.contains(DEPARTMENT).click();

    cy.get(JOB_OFFER_LIST).then((result) => {
      for (let index = 0; index < result.length; ++index) {
        let text = result[index].textContent;
        if (text.includes(QA_AUTOMATION)) {
          cy.log(`We have QA Automation position: ${text}`);
        } else if (text.includes(QA_MANUAL)) {
          cy.log(`We have QA manual position: ${text}`);
        } else {
          throw new Error("We don't need a QA for this moment");
        }
      }
    });
  });
});
