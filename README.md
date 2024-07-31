Welcome to the Travel Itinerary App! 

This web application allows users to explore and create travel itineraries, complete with detailed information about destinations, activities, accommodations, and more. It also includes user authentication features such as signup and login, using Passport.js for local authentication.

Features :-

*CRUD Operations: Create, Read, Update, and Delete itineraries.
*Itinerary Details: Each itinerary includes a description, start and end dates, activities, *accommodations, and transport facilities.
*User Authentication: Secure user signup and login with local authentication using Passport.js.
*Session Management: Sessions are managed using cookies with secure options.
*Flash Messages: Display success and error messages to users.
*Exception Handling: Centralized error handling and custom error messages.

Usage :-

*Home Page: The root route (/) displays a welcome message.
*Itineraries:
-View all itineraries at /itinerary.
-Create a new itinerary at /itinerary/new (requires login).
-View a specific itinerary's details at /itinerary/:id.
-Edit an itinerary at /itinerary/:id/edit (requires login).
-Delete an itinerary (requires login).
*Reviews:
-Add a review to an itinerary at /itinerary/:id/reviews.
-Delete a review at /itinerary/:id/reviews/:reviewId (requires login).
*User Authentication:
*Signup at /signup.
*Login at /login.
*Logout at /logout.

Middleware and Utilities :-

Middleware:

*isLoggedIn: Middleware to check if a user is logged in.
*validateItinerary: Middleware to validate itinerary data using Joi.
*validateReview: Middleware to validate review data using Joi.

Utilities:

*wrapAsync: Utility function to catch errors in asynchronous route handlers.
*ExpressError: Custom error class for handling exceptions.

Technologies Used :-

*Backend: Node.js, Express.js
*Frontend: EJS templates
*Database: MongoDB
*Authentication: Passport.js (local strategy)
*Other: Bootstrap (for styling), Flash (for messages), Cookie-Session (for session management)