const express = require('express');
const app = express();

const PORT = 8080;

app.get('/', (req, res) => {
  // serves index.html in public folder

  res.sendFile('public/index.html', { root: __dirname });
});

app.get('/buzzwords', (req, res) => {
  // retrieves all buzzwords
  // RESPONSE:    { buzzWords : [...] }    => A JSON response containing an array of current buzzwords

  res.sendFile('public/index.html', { root: __dirname });
});

app.post('/buzzwords', (req, res) => {
  // Creates a new buzzword object.  Returns 'true' if successful else 'false'
  // REPONSE:  { success: true }
  // BODY:  { buzzWord : String, points : Number }

  res.send('hello');
});

app.put('/buzzwords', (req, res) => {
  // Updates a buzzword's point value.  Returns true if successful else false
  // RESONSE: { success: true }
  // BODY: { buzzWord: String, points: Number };

  res.send('hello');
});

app.delete('/buzzwords', (req, res) => {
  // Delete a buzzword. Returns true if successful else false
  // RESPONSE: { success: true }
  // BODY: { buzzWord: String }

  res.send('hello');
});

app.post('/reset', (req, res) => {
  // Resets the server.  All buzzwords are removed and total scores reset to 0
  // RESPONSE: { success: true }
  // BODY: { reset: true }

  res.send('hello');
});

app.post('/heard', (req, res) => {
  // Marks that a buzzword has been heard and should update the total score.  Returns the new total score if successful otherwise returns just false
  // RESPONSE: { totalSocre: Number }
  // BODY: { buzzword: String }

  res.send('hello');
});

app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});
