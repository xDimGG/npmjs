const { get } = require('snekfetch');
let partners;

get('https://partners.npmjs.com/hiring').then(res => partners = res.body);

setInterval(() => {
  if (new Date().getHours() === 0) get('https://partners.npmjs.com/hiring').then(res => partners = res.body);
}, 1000 * 60 * 60);

module.exports = async (req, res) => {
  if (req.path.includes('/random')) res.json(partners[Math.floor(Math.random() * partners.length)])
  else res.json(partners);
};