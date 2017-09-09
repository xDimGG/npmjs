// Express Stuff
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

// help page
const info = [
  '/api/npm/expansions',
  '/api/npm/expansions/random',
  '/api/npm/partners',
  '/api/npm/partners/random',
  '/api/user/:user/profile',
  '/api/user/:user/packages'
];

// Routes
app.get('/api/npm/expansions', require('./src/npm/expansions'));
app.get('/api/npm/expansions/random', require('./src/npm/expansions'));

app.get('/api/npm/partners', require('./src/npm/partners'));
app.get('/api/npm/partners/random', require('./src/npm/partners'));

app.get('/api/user/:user/profile', require('./src/user/profile'));
app.get('/api/user/:user/packages', require('./src/user/packages'));

app.use((req, res) => res.send(`<pre style="text-align:center">${info.join('<br>')}</pre>`));

app.listen(3333);