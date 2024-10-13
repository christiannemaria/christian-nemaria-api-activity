const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'christnems',
  database: 'APImovienemaria'
});

// connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + db.threadId);
});

// returns list of movies
app.get('/movies', (req, res) => {
  const sql = 'SELECT * FROM movies';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// returns a single movie by ID
app.get('/movies/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM movies WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(404).send({ message: 'Movie not found' });
    }
    res.json(results[0]);
  });
});

// creates a new movie
app.post('/movies', (req, res) => {
  const { title, director, year, genre } = req.body;

  if (!title || !director || !year || !genre) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  const sql = 'INSERT INTO movies (title, director, year, genre) VALUES (?, ?, ?, ?)';
  db.query(sql, [title, director, year, genre], (err, results) => {
    if (err) throw err;
    res.status(201).send({ id: results.insertId, ...req.body });
  });
});

// updates a movie by ID
app.put('/movies/:id', (req, res) => {
  const { id } = req.params;
  const { title, director, year, genre } = req.body;

  if (!title || !director || !year || !genre) {
    return res.status(400).send({ message: 'All fields (title, director, year, genre) are required' });
  }

  const sql = 'UPDATE movies SET title = ?, director = ?, year = ?, genre = ? WHERE id = ?';
  db.query(sql, [title, director, year, genre, id], (err, results) => {
    if (err) {
      return res.status(500).send({ message: 'Error updating movie', error: err });
    }

    if (results.affectedRows === 0) {
      return res.status(404).send({ message: 'Movie not found' });
    }

    const updatedMovie = { id, title, director, year, genre };

    res.send({
      message: 'Movie updated successfully',
      updatedMovie
    });
  });
});

// deletes a movie by ID
app.delete('/movies/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM movies WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) throw err;
    if (results.affectedRows === 0) {
      return res.status(404).send({ message: 'Movie not found' });
    }
    res.send({ message: 'Movie deleted successfully' });
  });
});

// server start
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
