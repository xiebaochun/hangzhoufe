var models  = require('../models');
var ActivityUser    = models.ActivityUser;
/*!
 * nodeclub - site index controller.
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * Copyright(c) 2012 muyuan
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
exports.index = function (req, res, next) {
    ActivityUser.find({}, {}, {}, function(err, ActivityUsers) {
        // console.log(ActivityUsers);
        res.render('activity/index', {
            ActivityUsers: ActivityUsers
        });
    });
    
};


