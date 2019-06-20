var models  = require('../models');
var ActivityUser    = models.ActivityUser;
var utility = require('utility');
var uuid    = require('node-uuid');

exports.newAndSave = function (name, phone, address, callback) {
  var user         = new ActivityUser();
  user.name        = name;
  user.phone       = phone;
  user.address     = address;
  user.save(callback);
};

exports.getUsersByQuery = function (query, opt, callback) {
  ActivityUser.find(query, '', opt, callback);
};