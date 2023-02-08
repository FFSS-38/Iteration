const { User, Pet, Session } = require('../models/models');

const sessionController = {};

sessionController.startSession = (req, res, next) => {
  console.log('Starting Session');
  console.log('resLocals:', res.locals.userid);
  Session.create({ cookieId: res.locals.userid })
    .then((data) => {
      console.log('Successfully created session', data);
      next();
    })
    .catch((err) => {
      next({
        log: 'Error occurred in the sessionController.startSession middleware',
        status: 400,
        err: { err: 'Error occurred in creating your session' },
      });
    });
};

sessionController.checkSession = (req, res, next) => {
  //get cookie and find in db
  const ObjectId = require('mongodb').ObjectId;
  const id = res.cookies.ssid;
  if (!id) {
    return next({
      log: 'Error occurred in the sessionController.checkSession',
      status: 400,
      err: { err: 'No cookie found' },
    });
  }
  const o_id = new ObjectId(id);
  console.log('checking for session with id', id);
  Account.find({ _id: o_id })
    .exec()
    .then((data) => {
      console.log('session exists');
    })
    .catch((err) => {
      next({
        log: 'Error occured in checkSession; unable to find session',
        status: 400,
        err: { err: 'No session found' },
      });
    });
};

module.exports = sessionController;
