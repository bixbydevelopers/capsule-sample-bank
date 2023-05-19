'use strict';

const passport = require('passport');
const accounts = require('../lib/accounts');

module.exports.info = function(req, res, next) {
  passport.authenticate('bearer', { session: false },
    function(err, user, info) {
      if (err && err.message === 'Token Not Found') {
        res.status(401).send({ error: 'invalid_grant'});
      }
      else {
        res.json(accounts);
      }
    })(req, res, next);
};

module.exports.commitTransfer = function(req, res, next) {
  passport.authenticate('bearer', { session: false },
    function(err, user, info) {
      if (err && err.message === 'Token Not Found') {
        res.status(401).send({ error: 'invalid_grant'});
      }
      else {
        res.json({"message": "Transfer complete!"});
      }
    })(req, res, next);
}
