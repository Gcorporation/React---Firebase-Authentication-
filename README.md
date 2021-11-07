## Managing the Auth state with context (Commit 5)

1. Added React context to manage state for login and logout on respective successful attempt.
2. Integrated the concept on AuthForm.js and MainNavigation.js
3. Added AuthContext provider on index.js

## Using The Token For Requests To Protected Resources (Commit 6)

1. added logic to save token using Context and sending request to change user's password using token

## Redirecting the user (Commit 7)

1. redirecting the user after successful login and successful change password to home page using History. 

## Adding Logout (Commit 8)

1. added logout functionality on MainNavigation.js

## Protecting Front-End pages (Commit 9)

1. added logic to conditionally render pages based on auth state

## Adding and fetching token from local storage (Commit 10)

1. adding and fetching token from local storage, using it in context and removing from local storage at time of logout.

## Adding auto logout (Commit 11)

1. adding auto logout using expiration time.

## Finishing steps (Commit 12)

1. added logic to add and remove token, set and clear timeout for logout