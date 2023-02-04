const db = require('../database');

const starWarsController = {};

starWarsController.getCharacters = (req, res, next) => {
  // write code here
  const sql = 'SELECT * FROM ads';
  db.query(sql)
    .then((result) => {
      // console.log('result',result.rows);
      //console.log(result.rows);
      res.locals.ads = result.rows;
      return next();
    })
    .catch((e) => {
      return next({
        log: e,
        status: 500,
        message: { err: 'error from getting characters during query' },
      });
    });
};

module.exports = starWarsController;
