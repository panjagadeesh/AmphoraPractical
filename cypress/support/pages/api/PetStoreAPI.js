class PetStoreAPI {
    constructor() {
        this.baseUrl = 'https://petstore.swagger.io/v2';
        this.petId = null;
    }

    // API Endpoints
    endpoints = {
        pet: '/pet',
        petById: (id) => `/pet/${id}`
    }

    // Test Data
    getPetData() {
        return {
            id: Math.floor(Math.random() * 1000000),
            category: {
                id: 1,
                name: "Dogs"
            },
            name: "TestDog",
            photoUrls: ["https://example.com/dog.jpg"],
            tags: [
                {
                    id: 1,
                    name: "friendly"
                }
            ],
            status: "available"
        };
    }

    // API Methods
    createPet(petData) {
        return cy.request({
            method: 'POST',
            url: `${this.baseUrl}${this.endpoints.pet}`,
            body: petData
        }).then((response) => {
            this.petId = response.body.id;
            return response;
        });
    }

    updatePet(petData) {
        return cy.request({
            method: 'PUT',
            url: `${this.baseUrl}${this.endpoints.pet}`,
            body: petData
        });
    }

    getPet() {
        return cy.request({
            method: 'GET',
            url: `${this.baseUrl}${this.endpoints.petById(this.petId)}`
        });
    }

    deletePet() {
        return cy.request({
            method: 'DELETE',
            url: `${this.baseUrl}${this.endpoints.petById(this.petId)}`
        });
    }

    // Assertions
    verifyPetResponse(response, expectedData) {
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.include(expectedData);
    }

    verifyPetDeleted(response) {
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal(this.petId.toString());
    }
}

export default new PetStoreAPI(); 