require('dotenv').config();
const express = require('express');
const { getMessagesFromDb } = require('./main');
const { sortByRating } = require('../../../../common/src/services/ratings');

const app = express();
app.set('port', process.env.PORT || 4000);

app.get('/messages/:channelId?', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  const channelId = req.params.channelId || '';
  const messages = await getMessagesFromDb(channelId);
  return res
    .json(await sortByRating(req.query.sortby || 'HOT', messages))
    .status(200);
});

app.listen(app.get('port'), () =>
  console.log(`Server is ready at http://localhost:${app.get('port')}`)
);
