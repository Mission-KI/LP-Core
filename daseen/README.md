# DASEEN

This guide will walk you through setting up the React app in development mode.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (includes npm)

## Installation Steps

Follow these steps to get the app running locally.

### 1. Clone the Repository

First, clone the repository from the Git link provided by your team:

```bash
git clone git@github.com:Beebucket/daseen.git
```

### 2. Navigate to the Project Directory

After cloning the repository, navigate into the project folder:

```bash
cd daseen/
```

### 3. Navigate to the Frontend Folder

Next, move into the `frontend` folder:

```bash
cd frontend
```

### 4. Install Dependencies

Run the following command to install all the necessary npm packages:

```bash
npm install
```

### 5. Create a `.env` File

Inside the `frontend` folder, create a new `.env` file:

Add the required environment variables to the `.env` file. You can obtain the correct `.env` content from your colleagues. Example:

```bash
REACT_APP_ELASTIC_URL = "YOUR-API-KEY"
REACT_APP_ELASTIC_API_KEY = "YOUR-API-KEY"
```

### 6. Start the Development Server

Once everything is set up, start the development server with:

```bash
npm start
```

This will launch the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
