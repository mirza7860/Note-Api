# Note-Api (CRUD with Authentication)

Developed a complete end to end backend note api with crud operations . 

## Features

- User Authentication (Login, Logout, Register)
- Note Management (Create, Read, Update, Delete)

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Start the server with `npm start`.

## Usage

The project provides RESTful APIs for user authentication and note management.

### API Endpoints

- **User Authentication:**
  - POST /api/v1/user/login
  - POST /api/v1/user/logout
  - POST /api/v1/user/register

- **Note Management:**
  - POST /api/v1/app/notes (Create Note)
  - GET /api/v1/app/notes (Get All Notes)
  - GET /api/v1/app/notes/:userId (Get User Notes)
  - PATCH /api/v1/app/notes/:noteId (Update Note)
  - DELETE /api/v1/app/notes/:noteId (Delete Note)

## Contributing

Feel free to contribute by submitting bug reports, feature requests, or pull requests.
