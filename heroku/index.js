const path = require('path');
const express = require('express');
const sslRedirect = require('heroku-ssl-redirect').default;
const app = express();

app.use(sslRedirect());

app.use(express.static(path.join(__dirname, '../dist')));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server started on port ' + port));
