# APIMovie-Christian-nemaria-CRUD-API-DATABASESQL-MOVIE-PROJECT

## Overview

This project is an Express-based API designed to handle a movie database. It supports essential CRUD operations (Create, Read, Update, Delete) for managing a list of movies. Each movie entry contains the following attributes:

-id (auto-generated, numeric)
-title (string, required)
-director (string, required)
-year (numeric, required)
-genre (string, required)

The API is linked to a MySQL database for persistent storage.

Key Features:

-Retrieve all movies: Get a list of all movies stored in the database.
-Get a specific movie: Fetch details of a movie by its unique ID.
-Add a new movie: Insert a new movie record into the database.
-Update a movie: Modify an existing movie using its ID.
-Delete a movie: Remove a movie record by its ID.

Installation Steps:

[
{
"id": 1,
"title": "Interstellar",
"director": "Christopher Nolan",
"year": 2014,
"genre": "Adventure"
},
...
]

### 2. Get a movie by ID
- *Route*: GET /movies/:id
- *Description*: Returns a single movie by its ID.
- *Response*:
  
{
"id": 1,
"title": "Interstellar",
"director": "Christopher Nolan",
"year": 2014,
"genre": "Adventure"
}

### 3. Create a new movie
- *Route*: POST /movies
- *Description*: Creates a new movie in the collection.
- *Request Body*:
  
{
"title": "Parasite",
"director": "Bong Joon-ho",
"year": 2019,
"genre": "Thriller"
}
- *Response*:
  
{
"message": "Movie added successfully",
"movie": {
"id": 2,
"title": "Parasite",
"director": "Bong Joon-ho",
"year": 2019,
"genre": "Thriller"
}
}

### 4. Update a movie by ID
- *Route*: PUT /movies/:id
- *Description*: Updates an existing movie by its ID.
- *Request Body*:
  
{
"title": "Interstellar",
"director": "Christopher Nolan",
"year": 2014,
"genre": "Sci-Fi/Adventure"
}
- *Response*:
  
{
"message": "Movie updated successfully"
}

### 5. Delete a movie by ID
- *Route*: DELETE /movies/:id
- *Description*: Deletes a movie by its ID.
- *Response*:
  
{
"message": "Movie deleted successfully"
}

## Installation

1. Clone the repository:
   
git clone <repository-link>
cd APImovie-Christian-nemaria-api-activity

2. Initialize npm and install dependencies:
   
npm init -y
npm install express mysql2 body-parser

3. Create the MySQL database and populate it with sample data:
   
CREATE DATABASE movieDB;
USE movieDB;

CREATE TABLE movies (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255) NOT NULL,
director VARCHAR(255) NOT NULL,
year INT NOT NULL,
genre VARCHAR(100) NOT NULL
);

INSERT INTO movies (title, director, year, genre)
VALUES ('The Social Network', 'David Fincher', 2010, 'Drama');

INSERT INTO movies (title, director, year, genre)
VALUES ('The Grand Budapest Hotel', 'Wes Anderson', 2014, 'Comedy');

INSERT INTO movies (title, director, year, genre)
VALUES('Blade Runner 2049', 'Denis Villeneuve', 2017, 'Sci-Fi');

INSERT INTO movies (title, director, year, genre)
VALUES ('Interstellar', 'Christopher Nolan', 2014, 'Adventure');

INSERT INTO movies (title, director, year, genre)
VALUES('Mad Max: Fury Road', 'George Miller', 2015, 'Action');

INSERT INTO movies (title, director, year, genre)
VALUES ('The Godfather Part II', 'Francis Ford Coppola', 1974, 'Crime');

INSERT INTO movies (title, director, year, genre)
VALUES ('Kill Bill: Vol. 1', 'Quentin Tarantino', 2003, 'Action');

4. Start the server:
   
node index.js

Your server should now be running on http://localhost:8080.

## Usage with Insomnia

You can test the API using Insomnia by performing the following operations:

- *GET /movies*: Retrieve all movies.
- *GET /movies/{id}*: Retrieve a movie by its ID.
- *POST /movies*: Create a new movie (provide a JSON body with movie data).
- *PUT /movies/{id}*: Update a movie by its ID (provide a JSON body with updated data).
- *DELETE /movies/{id}*: Delete a movie by its ID.

## Error Handling

- *404 Not Found*: If a movie is not found by its ID.
- *400 Bad Request*: If required fields are missing when creating or updating a movie.

## Conclusion

This project provides an easy-to-use API for managing a movie collection with the capability to create, read, update, and delete movies. The API is built with Node.js, Express, and MySQL, and it includes basic validation and error handling.
