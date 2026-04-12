const express = require('express');
const app = express();

app.get('/users', (req, res) => {
  res.json([{ id: 1, name: "Akash" }]);
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});