const { get } = require('snekfetch');

module.exports = async (req, res) => {
  const packages = [];
  (add = num => {
    console.log(num)
    return new Promise(resolve => {
      get(`https://www.npmjs.com/profile/${req.params.user}/packages?offset=${num}`).then(data => {
        const json = data.body;
        packages.push.apply(packages, json.objects);
        if (json.hasMore) add(++num);
        else res.json(packages);
      });
    });
  })(0);
};