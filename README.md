# Books CRUD API

A simple CRUD API for managing books, built using Fastify and MongoDB.

## Features
* CRUD Operations: Create, Read, Update, and Delete books.
* Fast: Built with Fastify for optimal performance.
* MongoDB Integration: Uses MongoDB as a data store.

## API Endpoints

### Get All Books
* Endpoint: /books
* Method: GET
* Description: Fetches all books from the database.

### Get a Single Book
* Endpoint: /books/:id
* Method: GET
* Description: Fetches a single book by its ID.

### Add a New Book
* Endpoint: /books
* Method: POST
* Body:
```json
{
  "title": "Book Title",
  "author": "Author Name"
}
```
* Description: Adds a new book to the database.


### Update a Book
* Endpoint: /books/:id
* Method: PUT
* Body:
```json
{
  "title": "Updated Title",
  "author": "Updated Author"
}
```
* Description: Updates an existing book by its ID.


### Delete a Book
* Endpoint: /books/:id
* Method: DELETE
* Description: Deletes a book by its ID.

## Prerequisites
* Docker
* Node
* NPM

## Setup & Running

### Clone the Repository:

#### Start by cloning the repository to your local machine:

```bash
git clone [repository_url]
cd [repository_directory]
Build and Run with Docker Compose:
```

### Tests

You need a local mongodb instance for connection as i havent added test runner in docker image build time

```bash
npm test
```

#### Use Docker Compose to build and run the application:

```bash
docker-compose up --build
The --build flag ensures that Docker builds the image using the provided Dockerfile. Once built, Docker Compose will start the services defined in docker-compose.yml.
```

### Running without docker

You can use the build & start scripts present in package.json

You will also need to change the .env to your local mongodb connection

```bash
npm run build
```

```
npm start
```

#### Access the Application:

With the services running, you can access the Node.js application in your browser or through any API client at:

```
http://localhost:8080
Adjust the port (8080 in this example) if your docker-compose.yml specifies a different port mapping.
```