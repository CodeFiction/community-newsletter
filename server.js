require('dotenv').config();
const express = require('express');
const { getMessages, uploadMessages } = require('./src/main');

const app = express();
app.set('port', process.env.PORT || 4000);

app.get('/messages/:channelId?', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  const channelId = req.params.channelId || process.env.CHANNEL_ID;
  return res.json(await getMessages(channelId)).status(200);
});

app.listen(app.get('port'), () =>
  console.log(`Server is ready at http://localhost:${app.get('port')}`)
);
