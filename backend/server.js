// === server.js ===
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sivaganesh042@',
  database: 'tododb'
});

db.connect(err => {
  if (!err) console.log('DB connected');
  else console.log('DB not connected', err);
});

app.get("/get-items", (req, res) => {
  db.query("SELECT * FROM todo_item1", (err, result) => {
    if (err) return res.status(500).send("Error fetching items");
    res.json(result);
  });
});

app.post("/add-item", (req, res) => {
  const { item } = req.body;
  if (!item || item.trim() === "") {
    return res.status(400).send("Item cannot be empty");
  }
  db.query("INSERT INTO todo_item1(description) VALUES (?)", [item], (err, result) => {
    if (err) return res.status(500).send("Error adding item");
    res.send("Item added successfully");
  });
});

app.put("/update-item/:id", (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  if (!description || description.trim() === "") {
    return res.status(400).send("Description cannot be empty");
  }
  db.query("UPDATE todo_item1 SET description = ? WHERE id = ?", [description, id], (err) => {
    if (err) return res.status(500).send("Error updating item");
    res.send("Item updated successfully");
  });
});

app.delete("/delete-item/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM todo_item1 WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).send("Error deleting item");
    res.send("Item deleted successfully");
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});