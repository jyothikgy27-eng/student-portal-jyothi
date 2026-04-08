const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const FILE = './data.json';

// GET API → fetch data
app.get('/contacts', (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE));
  res.json(data);
});

// POST API → store data
app.post('/contacts', (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE));

  const newEntry = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  };

  data.push(newEntry);
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

  res.json({ message: "Saved successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});