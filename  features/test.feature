Feature: Book a ticket
    Scenario: Should book a ticket today
        Given user is on "/index.php" page
        When user choose time
        And user choose free chair
        Then user sees the ticket booking confirmation

    Scenario: Should book a ticket tomorrow
        Given user is on "/index.php" page
        When user choose tomorrow
        And user choose time
        And user choose free chair
        Then user sees the ticket booking confirmation
        Then user sees the data

    Scenario: Choice of reserved seat
        Given user is on "/index.php" page
        When user choose time
        And user choose reserved chair
        Then user stays on the purchase page