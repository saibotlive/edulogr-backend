# Backend - Edulogr

## Overview

This is the backend part of the Edulogr. It is built using Node.js, Express, and MongoDB.

## Project Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/incident-reporting-system.git
   cd incident-reporting-system/backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Build for production:**

   ```bash
   npm run build
   ```

5. **Run production build:**
   ```bash
   npm start
   ```

## Available Scripts

- `npm run dev`: Starts the development server with hot reloading.
- `npm run build`: Compiles TypeScript to JavaScript.
- `npm start`: Runs the compiled JavaScript in production mode.
- `npm run lint`: Runs ESLint for code quality.
- `npm run test`: Runs tests.

## Folder Structure

```
backend/
├── src/
│   ├── controllers/        # Express route controllers
│   ├── middleware/         # Express middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # Express route definitions
│   ├── services/           # Service layer
│   ├── utils/              # Utility functions
│   ├── app.ts              # Express app setup
│   └── server.ts           # Server setup
├── .env                    # Environment variables
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project metadata and dependencies
└── README.md               # This file
```

## Environment Variables

Create a `.env` file in the root of the `backend` directory and add the following environment variables:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/incident_reporting
JWT_SECRET=your_jwt_secret
```

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new institution.
- `POST /api/auth/login`: Log in an institution.

### Incidents

- `POST /api/incidents`: Report a new incident.
- `GET /api/incidents`: Get all incidents.
- `GET /api/incidents/:id`: Get an incident by ID.
- `POST /api/incidents/sign/:id`: Sign an incident.
- `GET /api/incidents/statistics`: Get incident statistics.

## Important Libraries

- **Express**: Web framework for Node.js.
- **Mongoose**: MongoDB object modeling for Node.js.
- **jsonwebtoken**: JWT library for authentication.
- **TypeScript**: Typed superset of JavaScript.

## Learn More

To learn more about the frameworks and libraries used in this project, check out the following resources:

- [Express Documentation](https://expressjs.com/en/starter/installing.html)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [jsonwebtoken Documentation](https://github.com/auth0/node-jsonwebtoken#readme)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
