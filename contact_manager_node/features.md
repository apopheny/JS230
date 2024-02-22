You should implement all the features there, including the search. Also, implement a "tagging" feature, which allows you to create tags, such as "marketing," "sales," "engineering," and when you add/edit a contact, you can select a tag to attach to the contact. Finally, you can click on a tag and show all the contacts with that tag. The UI isn't too important here since the focus is on the functionality. The other difference between the project in the link and the one you'll develop is that your application will have an API server to store and retrieve contacts.

# Features

- Search
  - Page updates when typing in search field to show contacts whose names match the input string, or all contacts
- Tags
  - An add tag button for creating tags
  - List tags on the homepage, making them clickable such that they display contacts to which the tag has been applied
- Adding contacts
  - Validate for names being comprised of letters, hyphens, spaces, and apostrophes
  - emails should be letter/number+@letternumber+.2letternumbers
  - Phone numbers should be optional, numerical, and comprised of 10 digits in a simple string
  - Tags are optional, and all tags may be applied to a profile
- Editing contacts
  - Perform same validations as above
- Deleting contacts
  - Alert user for confirmation
  - If no, nothing
  - If yes, redisplay page

# Analysis of template app

## UI is not a feature. It is plain by design

## Navigation:

- A modal overlay slides over the page when adding or editing a contact
- The home page slides back over upon successful submission or cancelation
- The home page lists contacts in the order in which they were added
  - There is no pagination for contact overflow

## Adding contacts:

- There is verification performed during the submit process:
  - Names should be non-empty -- there does not seem to be any verification performed for special characters, which is an improvement opportunity
  - Email addresses verify based on x@x.yy, where x is any character (again, validating for special characters is an improvement opportunity) and y is alphabetical
  - Phone numbers are verified based on being non-empty alone
  - HTML inputs are escaped

## Editing contacts:

- The same validations as for adding are performed when editing

## Deleting contacts

- An alert pops up requesting user verification when clicking the delete button
  - Cancel dismisses the popup with no further interactivity
  - Confirmation immediately deletes the contact and the page is updated

## Search

- Searches update the home page to display only contacts whose names case-insensitively include the search string
- If the matches are empty, it updates to display a corresponding no-contacts message
- The home page updates upon keypress
