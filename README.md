# Overview 
- This project implements a RESTful API server for user management, along with a client-side interface for real-time chat functionality. It incorporates essential features such as user authentication, database operations, and WebSocket-based real-time communication. The project has been designed to ensure scalability, modularity, and ease of deployment.


## Design Choices
1. ### Architecture
    - Backend: Built with Node.js and Express.js to handle RESTful APIs. WebSocket is used for two-way communication for chat functionality.
    - Frontend: Implemented with React.js, offering a dynamic and responsive user interface.
    - Database: MySQL is used for persistent data storage, chosen for its reliability and compatibility with relational data.
    - Containerization: Docker and Docker Compose are utilized to ensure consistent deployment across environments.

2. ### Real-Time Communication
    - WebSocket is used to establish a two-way communication channel. This enables real-time updates in chat features and enhances user interaction.

3. ### Authentication
    - JWT (JSON Web Token) is used for secure user authentication.
    - Tokens are stored in HTTP-only cookies to prevent XSS attacks.

4. ### Error Handling
    - A centralized error-handling middleware is implemented to manage errors and provide consistent API responses.

5. ### Logging
    - Basic logging is implemented to monitor server activity, including errors and WebSocket connections.
    - Logs can be extended using tools like Winston or Bunyan for production readiness.

6. ### Environment Configuration
    - Environment variables are managed using a .env file to store sensitive data like database credentials, JWT secret, and WebSocket configurations.

7. ### Database Design
    - The database is normalized and includes essential tables for users.
    - A users table schema:
        ``` sql
        CREATE TABLE users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        ``` 


## Assumptions
1. ### Environment:
    - The application will run in a containerized environment with Docker Compose managing multi-service setups.

2. ### Security:
    - JWT tokens are assumed to be securely signed using a secret key stored in environment variables.

3. ### Real-Time Requirements:
    - WebSocket server assumes all clients are authorized to connect. Further enhancements like token validation for WebSocket requests can be added.

4. ### Data Integrity:
    - The application assumes valid data input. Data validation is handled at both frontend and backend.


## Dependencies
1. ### Backend
    - express: For building RESTful APIs
    - jsonwebtoken: For authentication and token management
    - mysql2: For database connectivity
    - ws: For WebSocket communication
    - dotenv: For environment variable management

2. ### Frontend
    - react: For building a responsive user interface
    - react-router-dom: For handling page navigation
    - axios: For making HTTP requests

3. ### Docker
    - ```mysql:8.0```: Official MySQL image for the database
    - ```node:22```: Node.js runtime for backend and frontend builds

## Usage
1. ### Running the Application
    - Visit [my git repository](https://github.com/NarongritMookmanee/Interview-Assignments)
    - Clone the repository:
        ``` git clone https://github.com/NarongritMookmanee/Interview-Assignments ```
    - Navigate to the project directory and build the containers:
        ``` docker-compose up -d ```

2. ### Accessing the Application
    - Frontend: Accessible at http://localhost:3000
    - Backend: API available at http://localhost:8000
    - WebSocket: Available at [ws://localhost:8080](ws://localhost:8080)


## Future Improvements

1. ### Scalability:
    - Implement load balancing for WebSocket and REST APIs.

    - Use Redis for session and token storage to support horizontal scaling.

2. ### Error Reporting:

    - Enhance logging for better debugging and monitoring using third-party tools like ELK Stack or Datadog.

3. ### Security:

    - Implement HTTPS for secure communication.

    - Add rate limiting and IP blocking to prevent DDoS attacks.

4. ### Testing:
    - Write unit and integration tests for backend services using Jest or Mocha.