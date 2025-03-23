const HomePage = {
    // Selectors
    elements: {
        productsMenu: () => cy.get('#menu-item-32'),
        resourcesMenu: () => cy.get('#menu-item-456'),
        newsletterEmail: () => cy.get('input[type="email"]'),
        firstName: () => cy.get('input[name="contact[first_name]"]'),
        lastName: () => cy.get('input[name="contact[last_name]"]'),
        newsletterSubmit: () => cy.get('button[type="submit"]'),
        thankYouMessage: () => cy.contains('Thank you for signing up')
    },

    // Actions
    visit() {
        cy.viewport(1920, 1080);
        cy.visit('https://www.amphora.net', { timeout: 30000 });
        cy.document().should('have.property', 'readyState', 'complete');
        cy.wait(2000);
        cy.get('nav').should('be.visible');
        cy.get('#menu-item-32, #menu-item-456').should('exist');
    },

    clickProductsDropdown() {
        this.elements.productsMenu()
            .should('exist')
            .should('be.visible')
            .realHover();
        cy.wait(2000);
    },

    clickResourcesDropdown() {
        this.elements.resourcesMenu()
            .should('exist')
            .realHover();
        cy.get('ul.sub-menu li a')
            .contains('Newsletter sign-up')
            .click();
        cy.wait(10000);
    },

    fillNewsletterForm(email, firstName, lastName) {
        this.elements.newsletterEmail()
            .should('exist')
            .type(email, { force: true });

        this.elements.firstName()
            .should('be.visible')
            .type(firstName, { force: true });

        this.elements.lastName()
            .should('be.visible')
            .type(lastName, { force: true });

        this.elements.newsletterSubmit()
            .should('exist')
            .click({ force: true });
    },

    // Assertions
    verifyThankYouMessage() {
        this.elements.thankYouMessage()
            .should('exist')
            .should('be.visible');
    }

    ,
    verifyProductLinks() {
        // Wait for products menu to be visible
        this.elements.productsMenu()
            .should('exist')
            .realHover();

        // Wait for submenu to be visible
        cy.wait(1000);

        // Verify product links
        cy.get('#menu-item-32 .sub-menu a')
            .should('exist')
            .each(($el) => {
                cy.wrap($el).should('have.attr', 'href');
                cy.wrap($el).should('be.visible');
            });
    }

};

module.exports = HomePage;
