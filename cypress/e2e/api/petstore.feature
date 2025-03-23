Feature: Petstore API Testing

  Scenario: Create a new pet
    Given I have a unique pet data
    When I create a new pet with the unique data

  Scenario: Update the created pet
    Given I have a unique pet data
    When I create a new pet with the unique data
    When I update the created pet's information

  Scenario: Read the created pet
    Given I have a unique pet data
    When I create a new pet with the unique data
    When I fetch the created pet's information

  Scenario: Delete the created pet
    Given I have a unique pet data
    When I create a new pet with the unique data
    When I delete the created pet 