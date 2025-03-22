Feature: Amphora Website UI Tests

  Scenario: Verify Products dropdown functionality
    Given I navigate to Amphora website
    When I click on the Products dropdown
    And I verify all product list has been appearing 

  Scenario: Newsletter signup
    Given I navigate to Amphora website
    When I click on the Resources dropdown
    And I fill in the newsletter signup form
    Then I should see the thank you message 