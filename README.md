
# Lead CRM

A simple Lead Management System built using the MERN stack. This project helps manage leads by allowing users to add, view, edit, delete, and search for lead details.

## Features

- Add new leads with name, email, and phone number.
- View all leads in a table.
- Edit existing lead information.
- Delete leads.
- Search leads using their name or email.
- Manage lead status (New, Contacted, Converted).

## Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Building the frontend |
| Vite | Running the React development server |
| Node.js | Backend runtime |
| Express.js | Creating API routes |
| MongoDB | Storing lead information |
| Mongoose | Managing MongoDB data and validation |
| Axios | Connecting frontend with backend |
| CSS | Styling the application |
| dotenv | Managing environment variables |

## Project Structure

```text
lead-crm/
├── server/
│   ├── models/
│   │   └── Lead.js
│   ├── routes/
│   │   └── leads.js
│   ├── server.js
│   └── .env.example
│
└── client/
    ├── src/
    │   ├── components/
    │   │   ├── LeadForm.jsx
    │   │   └── LeadTable.jsx
    │   ├── api.js
    │   ├── App.jsx
    │   └── styles.css
    └── vite.config.js
```

## Getting Started

Follow these steps to run the project on your local machine.

### Requirements

- Node.js (version 18 or above)
- MongoDB or a MongoDB Atlas account
- npm

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd lead-crm
```

### 2. Run the Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder using `.env.example` as a reference.

Add your MongoDB connection string:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the backend:

```bash
npm run dev
```

The server should run at `http://localhost:5000`.

### 3. Run the Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173` in your browser to use the application.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/leads` | Get all leads |
| GET | `/api/leads?search=text` | Search leads by name or email |
| POST | `/api/leads` | Add a new lead |
| PUT | `/api/leads/:id` | Update a lead |
| DELETE | `/api/leads/:id` | Delete a lead |

## How It Works

The frontend is built with React and communicates with the backend using Axios. Express handles the API requests, and Mongoose is used to interact with MongoDB.

Vite is configured to forward API requests to the Express server.

**Application flow:**

React Frontend → Axios → Express API → Mongoose → MongoDB

