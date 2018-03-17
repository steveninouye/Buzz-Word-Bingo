const express = require('express');
const app = express();

const PORT = 8080;

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/buzzwords', (req, res) => {
  res.send('hello');
});

app.post('/buzzwords', (req, res) => {
  res.send('hello');
});

app.put('/buzzwords', (req, res) => {
  res.send('hello');
});

app.delete('/buzzwords', (req, res) => {
  res.send('hello');
});

app.post('/reset', (req, res) => {
  res.send('hello');
});

app.post('/heard', (req, res) => {
  res.send('hello');
});

app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});
