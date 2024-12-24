# Authentication and Authorization

This project is a full-stack application for managing authentication and authorization using the MERN (MongoDB, Express, React, Node.js) stack.

## Table of Contents

- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Features](#features)
- [Technologies Used](#technologies-used)

---

## Folder Structure

```
Authentication-and-Authorization
├── Cors
├── Enum
├── config
├── controller
├── middleware
├── model
├── routess
├── util
├── .gitignore
├── README.md
├── index.js
├── package-lock.json
├── package.json
```

### Description of Folders:
- **Cors:** Contains configurations for handling Cross-Origin Resource Sharing (CORS).
- **Enum:** Holds enumerations used in the application.
- **config:** Contains configuration files (e.g., database connection, environment variables).
- **controller:** Includes controller functions for handling business logic.
- **middleware:** Contains middleware for tasks like authentication, logging, etc.
- **model:** Defines the Mongoose schemas for MongoDB collections.
- **routess:** Contains the route definitions for the backend API.
- **util:** Includes utility functions and helpers.

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Authentication-and-Authorization
   ```

2. Install dependencies for both backend and frontend:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and provide the following variables:
   ```env
   MONGO_URI=<Your MongoDB connection string>
   JWT_SECRET=<Your JWT secret key>
   PORT=5000
   ```

4. Navigate to the frontend directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

---

## Running the Application

### Backend
Run the backend server using Nodemon:
```bash
nodemon index.js
```
The backend server runs on `http://localhost:5000` by default.

### Frontend
Run the frontend using:
```bash
npm run dev
```
The frontend runs on `http://localhost:3000` by default.

---

## Features

- User registration and login with encrypted passwords.
- Role-based authentication and authorization.
- Token-based authentication using JSON Web Tokens (JWT).
- Protected routes and middleware for access control.
- Comprehensive error handling and validation.

---

## Technologies Used

### Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT

### Frontend:
- React.js
- React Router
- Axios

---

## Contribution Guidelines

Feel free to fork this repository, create a feature branch, and submit a pull request. Contributions are welcome!

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contact

For any inquiries, please reach out to:
- Developer Name: Akanksha Kumari
-

---
