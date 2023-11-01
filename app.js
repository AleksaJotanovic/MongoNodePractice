const express = require("express");
const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");

//App initi & middleware
const app = express();
app.use(express.json());

//Database connection
let database;
connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("App listening on port 3000");
    });
    database = getDb();
  }
});

app.get('/books', (req, res) => {
  let books = [];

  database.collection('books')
    .find()
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    })
});

app.get('/books/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    database.collection('books').findOne({ _id: new ObjectId(req.params.id) }).then((doc) => {
      res.status(200).json(doc);
    }).catch((err) => {
      res.status(500).json({ error: "Could not fetch the document." })
    });
  } else {
    res.status(500).json({ error: 'Not valid document id' });
  }
});

app.post('/books', (req, res) => {
  const book = req.body;

  database.collection('books').insertOne(book).then((result) => {
    res.status(201).json(result);
  }).catch((err) => {
    res.status(500).json({ err: 'Could not create a new document' });
  })
});

app.delete('/books/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    database.collection('books').deleteOne({ _id: new ObjectId(req.params.id) }).then((doc) => {
      res.status(200).json(doc);
    }).catch((err) => {
      res.status(500).json({ err: "Could not delete the document." })
    });
  } else {
    res.status(500).json({ error: 'Not valid document id' });
  }
});

app.patch('/books/:id', (req, res) => {
  const updates = req.body;

  if (ObjectId.isValid(req.params.id)) {
    database.collection('books').updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates }).then((doc) => {
      res.status(200).json(doc);
    }).catch((err) => {
      res.status(500).json({ error: "Could not update the document." })
    });
  } else {
    res.status(500).json({ error: 'Not valid document id' });
  }
});