const { get } = require('snekfetch');
let expansions;

get('https://raw.githubusercontent.com/npm/npm-expansions/master/expansions.txt').then(res => expansions = res.text.split('\n').sort());

setInterval(() => {
  if (new Date().getHours() === 0) get('https://raw.githubusercontent.com/npm/npm-expansions/master/expansions.txt').then(res => expansions = res.text.split('\n').sort());
}, 1000 * 60 * 60);

module.exports = async (req, res) => {
  if (req.path.includes('/random')) res.send(expansions[Math.floor(Math.random() * expansions.length)])
  else res.json(expansions);
};