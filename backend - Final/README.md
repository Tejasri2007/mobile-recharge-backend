# Mobile Recharge Backend

## Project Structure

```
backend/
├── config/          # Database configuration
│   └── database.js  # MongoDB connection setup
├── models/          # Mongoose schemas
│   ├── User.js      # User model
│   └── Plan.js      # Plan model
├── routes/          # API route definitions
│   └── userRoutes.js # User-related routes
├── controllers/     # Request handling logic
│   └── userController.js # User controller
├── server.js        # Main server file
├── package.json     # Dependencies and scripts
└── README.md        # Project documentation
```

## Folder Purpose

- **config/**: Contains database configuration and connection setup
- **models/**: Mongoose schemas defining data structure
- **routes/**: API endpoint definitions and routing
- **controllers/**: Business logic and request handling
- **server.js**: Main application entry point

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start MongoDB service locally

3. Run the server:
   ```bash
   npm run dev  # Development mode with nodemon
   npm start    # Production mode
   ```

## API Endpoints

- `GET /` - Test route
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user

## Database Connection

- Local MongoDB: `mongodb://localhost:27017/mobile_recharge`
- For MongoDB Atlas, update connection string in `config/database.js`