require('dotenv').config();
const express = require('express');
const { getMessages, uploadMessages } = require('./src/main');

const app = express();
app.set('port', process.env.PORT || 4000);

app.get('/messages', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  return res.json(await getMessages()).status(200);
});

app.get('/messages/upload', async (req, res) => {
  const messages = await getMessages();
  return res.json(await uploadMessages(messages)).status(200);
});

app.listen(app.get('port'), () =>
  console.log(`Server is ready at http://localhost:${app.get('port')}`)
);
