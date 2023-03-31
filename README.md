# Product Management Application
A fullstack application built using Docker, Typescript, Express.js, and React.js.


### How to Run

`docker compose up -d`
Open a browser and navigate to http://localhost:5173.

## Swagger API Documentation
Navigate to http://localhost:80/api/api-docs

### Teardown

`docker compose down -v`

## Assumptions and Considerations
The requirements state to use port `3000` for hosting the API, however port 3000 is typically used for React apps initialized with `create-react-app`. Since the frontend of this app was initialized with Vite, the default port of `5173` was used for the frontend, and port `80` (the default for Express.js apps) was used for the backend.

This project requires that you have Docker installed. Since the competition specifies that it may be assumed that Docker is installed, no instructions were provided to install it here. Technically, that is the only dependancy to run this project. Docker will take care of everything else.