const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ type: false }));

const PORT = 8080;
let AllBuzzwords = [];
let UserScore = 0;

app.get('/', (req, res) => {
  // serves index.html in public folder
  res.sendFile('public/index.html', { root: __dirname });
});

app.get('/buzzwords', (req, res) => {
  // retrieves all buzzwords
  // RESPONSE:    { buzzWords : [...] }    => A JSON response containing an array of current buzzwords
  const arrayOfBuzzwords = AllBuzzwords.reduce((a, c) => {
    a.push(c.buzzWord);
    return a;
  }, []);
  res.send({ buzzWords: arrayOfBuzzwords });
});

app.post('/buzzwords', (req, res) => {
  // Creates a new buzzword object.  Returns 'true' if successful else 'false'
  // REPONSE:  { success: true }
  // BODY:  { buzzWord : String, points : Number }
  if (AllBuzzwords.length < 5 && req.body.buzzWord && req.body.points) {
    let cacheObj = {
      buzzWord: req.body.buzzWord,
      points: req.body.points
    };
    AllBuzzwords.push(cacheObj);
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
});

app.put('/buzzwords', (req, res) => {
  // Updates a buzzword's point value.  Returns true if successful else false
  // RESONSE: { success: true }
  // BODY: { buzzWord: String, points: Number };
  const responseStatus =
    req.body.buzzWord && req.body.points
      ? AllBuzzwords.reduce((a, c, i) => {
          if (
            !a &&
            c.buzzWord === req.body.buzzWord &&
            Number(req.body.points)
          ) {
            AllBuzzwords[i].points = Number(req.body.points);
            a = true;
          }
          return a;
        }, false)
      : false;
  res.send({ success: responseStatus });
});

app.delete('/buzzwords', (req, res) => {
  // Delete a buzzword. Returns true if successful else false
  // RESPONSE: { success: true }
  // BODY: { buzzWord: String }
  const responseStatus = req.body.buzzWord
    ? AllBuzzwords.reduce((a, c, i) => {
        if (!a && c.buzzWord === req.body.buzzWord) {
          AllBuzzwords.splice(i, 1);
          a = true;
        }
        return a;
      }, false)
    : false;
  console.log(AllBuzzwords);
  res.send({ success: responseStatus });
});

app.post('/reset', (req, res) => {
  // Resets the server.  All buzzwords are removed and total scores reset to 0
  // RESPONSE: { success: true }
  // BODY: { reset: true }
  if (req.body.reset === 'true') {
    AllBuzzwords = [];
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
});

app.post('/heard', (req, res) => {
  // Marks that a buzzword has been heard and should update the total score.  Returns the new total score if successful otherwise returns just false
  // RESPONSE: { totalScore: Number }
  // BODY: { buzzword: String }
  const responseStatus = req.body.buzzWord
    ? AllBuzzwords.reduce((a, c) => {
        if (!a && c.buzzWord === req.body.buzzWord) {
          UserScore += c.points;
          a = true;
        }
        return a;
      }, false)
    : false;
  if (responseStatus) {
    res.send({ totalScore: UserScore });
  } else {
    res.send({ success: false });
  }
});

//404 page
app.use((req, res) => {
  res.status(404).end('Page Not Available');
});

app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});
