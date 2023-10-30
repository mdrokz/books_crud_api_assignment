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
Copy code
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
Copy code
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


## Setup & Running