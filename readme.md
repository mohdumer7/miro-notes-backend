# Note Management RESTful API

## Overview

This project implements a secure and scalable RESTful API for note management, allowing users to create, read, update, delete notes, share them with others, and search based on keywords.

## Technology Stack

- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Rate Limiting and Throttling:** express-rate-limit and express-slow-down
- **Testing Framework:** Mocha and Chai
- **Postman collection JSON:** /postman 

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/note-management-api.git
cd note-management-api
```
### 2. Install Dependencies
```bash
npm install
```

### 3. Set Environment Variables
Create a .env file in the root directory with the following variables:

(please E-mail me for mongo URL or you can create your free mongo shared instance and add the url)

### env
```bash
PORT=3000
MONGODB_URI=mongo-cloud-url
SECRET_KEY=your-secret-key-for-jwt
```

### 4. Run the Application
```bash
npm start
```

## The APP will be accessible at http://localhost:3000.

### 5. Postman Import
A postman JSON collection is saved in ./postman which can be directly imported into postman.

### 6. Run Tests
```bash
npm test
```

# Note Management RESTful API - Detailed Report

## Overview

The Note Management RESTful API is designed to provide a comprehensive solution for managing user notes. It facilitates note creation, retrieval, updates, and deletion, along with features like sharing notes and searching based on keywords. Below, each API endpoint is explained in detail:

## Authentication Endpoints

### POST /api/auth/signup

**Description:** Create a new user account.

**Requirements:**
- Request body must contain user details (e.g., username, password).

### POST /api/auth/login

**Description:** Log in to an existing user account and receive an access token.

**Requirements:**
- Request body must contain user login credentials.
- Successful login results in an access token that must be included in subsequent requests.

## Note Endpoints

### GET /api/notes

**Description:** Get a list of all notes for the authenticated user.

**Requirements:**
- The request must include a valid access token for authentication.

### GET /api/notes/:id

**Description:** Get a specific note by ID for the authenticated user.

**Requirements:**
- The request must include a valid access token for authentication.
- Include the note ID as a parameter in the request URL.

### POST /api/notes

**Description:** Create a new note for the authenticated user.

**Requirements:**
- The request must include a valid access token for authentication.
- Request body must contain note details (e.g., title, content).

### PUT /api/notes/:id

**Description:** Update an existing note by ID for the authenticated user.

**Requirements:**
- The request must include a valid access token for authentication.
- Include the note ID as a parameter in the request URL.
- Request body must contain updated note details.

### DELETE /api/notes/:id

**Description:** Delete a note by ID for the authenticated user.

**Requirements:**
- The request must include a valid access token for authentication.
- Include the note ID as a parameter in the request URL.

### POST /api/notes/:id/share

**Description:** Share a note with another user for the authenticated user.

**Requirements:**
- The request must include a valid access token for authentication.
- Include the note ID as a parameter in the request URL.
- Request body must contain the user ID of the recipient and an indication of whether they can edit the shared note.
- There is also an endpoint to get all users which will return users(imagining a dropbox or a selection) to select the user to be shared to

## Search Endpoint

### GET /api/search?q=:query

**Description:** Search for notes based on keywords for the authenticated user.

**Requirements:**
- The request must include a valid access token for authentication.
- Include the search query as a parameter in the request URL.

## User Endpoint

### GET /api/users

**Description:** Get a list of all users.

**Requirements:**
- The request must include a valid access token for authentication.

## Considerations and Additional Information

- **Rate Limiting and Throttling:** The application implements rate limiting and request throttling to handle high traffic, ensuring the system's stability and preventing abuse.

- **Security:** Secure authentication and authorization mechanisms are implemented using JSON Web Tokens (JWT). Invalid tokens result in a 401 Unauthorized response, and unauthorized access to notes results in a 403 Forbidden response.

- **Testing:** The project uses Mocha and Chai for testing. Extensive unit, integration, and end-to-end tests cover all API endpoints to ensure correctness and performance.

# Project Dependencies Overview

## Dependencies

1. **bcrypt** (`^5.1.1`): Library for hashing passwords.
2. **body-parser** (`^1.20.2`): Middleware for parsing incoming request bodies.
3. **cors** (`^2.8.5`): Middleware for handling Cross-Origin Resource Sharing (CORS).
4. **dotenv** (`^16.3.1`): Loads environment variables from a `.env` file.
5. **esm** (`^3.2.25`): ECMAScript module loader for Node.js.
6. **express** (`^4.18.2`): Web framework for Node.js.
7. **express-rate-limit** (`^7.1.5`): Middleware for rate-limiting Express.js routes.
8. **express-slow-down** (`^2.0.1`): Middleware for slowing down Express.js routes.
9. **express-validator** (`^7.0.1`): Middleware for data validation in Express.js.
10. **jsonwebtoken** (`^9.0.2`): Library for generating and verifying JSON Web Tokens (JWTs).
11. **mongodb** (`^6.3.0`): Official MongoDB driver for Node.js.
12. **mongoose** (`^8.0.3`): ODM library for MongoDB and Node.js.

## Scripts

- **start:** `nodemon server.js` (Runs the server using Nodemon).
- **test:** `mocha --experimental-modules tests/**/*.test.js` (Executes Mocha tests).

## Dev Dependencies

- **chai** (`^5.0.0`): Testing assertion library.
- **mocha** (`^10.2.0`): JavaScript test framework.
- **nodemon** (`^3.0.2`): Utility for monitoring file changes and restarting the server.
- **supertest** (`^6.3.3`): Library for testing HTTP assertions.

These dependencies collectively help in building a secure, efficient, and testable Express.js application with MongoDB as the database.

This detailed report provides insights into the functionality, requirements, and considerations for each API endpoint in the Note Management RESTful API.

