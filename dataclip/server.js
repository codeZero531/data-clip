const  express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/dataclip'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/dataclip/index.html'));
});

app.listen(process.env.POST || 80);
