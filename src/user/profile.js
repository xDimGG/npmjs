const { get } = require('snekfetch');
const { load } = require('cheerio');

module.exports = (req, res) => {
  get(`https://www.npmjs.com/~${req.params.user}`).then(data => {
    const $ = load(data.text);
    res.json({
      name: $('h1').text(),
      fullname: $('h2.fullname').text(),
      picture_url: $('a.avatar > img').attr('src'),
      links: {
        email: $('li.email > a').attr('data-email').split('%').slice(1).map(e => String.fromCharCode(parseInt(e, 16))).join('') || null,
        homepage: $('li.homepage > a').text() || null,
        github: $('li.github > a').text().replace(/^@/, '') || null,
        twitter: $('li.twitter > a').text().replace(/^@/, '') || null,
        freenode: $('li.freenode > a').text() || null
      }
    });
  }).catch(() => res.json({error: 'User doesn\'t exist.'}));
};