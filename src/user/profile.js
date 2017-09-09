const { get } = require('snekfetch');
const { load } = require('cheerio');

module.exports = (req, res) => {
  get(`https://www.npmjs.com/~${req.params.user}`).then(data => {
    const $ = load(data.text);
    // Couldn't get map to work smh
    const stars = [];
    $('.starred-packages a').each(function() {
      stars.push($(this).text());
    });
    res.json({
      name: $('h1').text(),
      fullname: $('h2.fullname').text(),
      avatar: $('a.avatar > img').attr('src'),
      starred: stars,
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