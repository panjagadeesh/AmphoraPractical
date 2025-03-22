const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

let petData;
let petId;

Given('I have a unique pet data', () => {
    petData = {
        id: Math.floor(Math.random() * 1000000),
        category: {
            id: 1,
            name: "Dogs"
        },
        name: "TestDog",
        tags: [
            {
                id: 1,
                name: "friendly"
            }
        ],
        status: "available"
    };
    petId = petData.id;
});

When('I create a new pet with the unique data', () => {
    cy.request({
        method: 'POST',
        url: 'https://petstore.swagger.io/v2/pet',
        body: petData,
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.be.oneOf([200, 201]);
        expect(response.body.id).to.eq(petId);
    });
});

When('I update the created pet\'s information', () => {
    const updatedData = {
        ...petData,
        name: "UpdatedDog" + petId,
        status: "sold"
    };

    cy.request({
        method: 'PUT',
        url: 'https://petstore.swagger.io/v2/pet',
        body: updatedData,
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.be.oneOf([200, 201]);
        expect(response.body.name).to.eq(updatedData.name);
        petData = updatedData;
    });
});

When('I fetch the created pet\'s information', () => {
    cy.request({
        method: 'GET',
        url: `https://petstore.swagger.io/v2/pet/${petId}`,
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.be.oneOf([200, 404]);
        if (response.status === 200) {
            expect(response.body.name).to.eq(petData.name);
        }
    });
});

When('I delete the created pet', () => {
    cy.request({
        method: 'DELETE',
        url: `https://petstore.swagger.io/v2/pet/${petId}`,
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.be.oneOf([200, 204, 404]);
    });
}); 