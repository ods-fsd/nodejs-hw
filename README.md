# Notes API 📝

This is a simple REST API server built with **Node.js** and **Express** for managing personal notes. The project allows you to create, read, update, and delete notes using a **MongoDB** database.

## 🚀 Technologies

* **Node.js** — JavaScript runtime environment.
* **Express** — Web framework for building APIs.
* **MongoDB & Mongoose** — Database and ODM for data modeling.
* **Pino** — Fast logger for Node.js.
* **ESLint** — Linter for code quality.
* **Cors** — Middleware for handling Cross-Origin Resource Sharing.

## 🛠️ Installation and Setup

### Prerequisites

Before you begin, ensure you have the following installed:
* [Node.js](https://nodejs.org/) (version 18 or higher)
* MongoDB (local or Atlas cloud cluster)

### Installation Steps

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/ods-fsd/nodejs-hw.git](https://github.com/ods-fsd/nodejs-hw.git)
    cd nodejs-hw
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    Create a `.env` file in the root of the project and add the necessary settings (example below).

### `.env` Configuration

Create a `.env` file based on this template:

```env
# Server port
PORT=3000

# MongoDB connection string
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.net/my-notes-db?retryWrites=true&w=majority

# Environment (development or production)
NODE_ENV=development