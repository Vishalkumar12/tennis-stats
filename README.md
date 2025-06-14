# Tennis Player Stats API

A simple REST API for retrieving tennis player statistics.

## Features

- Get all players sorted by ID
- Get a specific player by ID
- Real-time data fetching from external source

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tennis-stats-api
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on port 3000 by default.

## API Endpoints

### Get All Players
```
GET /players
```
Returns a list of all players sorted by ID.

### Get Player by ID
```
GET /players/:id
```
Returns a specific player by their ID. Returns 404 if player not found.

## Testing

Run the test suite:
```bash
npm test
```