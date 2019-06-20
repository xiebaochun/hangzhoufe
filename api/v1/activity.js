var ActivityUserProxy   = require('../../proxy').ActivityUser;
var config       = require('../../config');
var eventproxy   = require('eventproxy');
var _            = require('lodash');
var at           = require('../../common/at');
var renderHelper = require('../../common/render_helper');
var validator    = require('validator');

var create = function (req, res, next) {
  var name   = validator.trim(req.body.name || '');
  var phone     = validator.trim(req.body.phone || '');
  var address = validator.trim(req.body.address || '');

  // 验证
  var errorMsg;
  if (name === '') {
    errorMsg = '姓名不能为空';
  } else if (name.length < 2 || name.length > 10) {
    errorMsg = '姓名长度太多或太少';
  } else if (phone === '') {
    errorMsg = '手机号码不能为空';
  } else if (!/\d{11}/ig.test(phone)) {
    errorMsg = '手机号码格式填写错误';
  } else if(address === '') {
    errorMsg = '收货地址不能为空';
  }
  // END 验证

  if (errorMsg) {
    // res.status(400);
    return res.send({success: false, msg: errorMsg});
  }

  ActivityUserProxy.getUsersByQuery({'$or': [
    {'phone': phone}
  ]}, {}, function (err, users) {

    if (err) {
      return next(err);
    }

    if (users.length > 0) {
      return res.send({success: false, msg: '手机号已被使用'});
    }

    ActivityUserProxy.newAndSave(name, phone, address, function (err, user) {
      if (err) {
        return next(err);
      }

      var proxy = new eventproxy();
      proxy.fail(next);

      proxy.all('score_saved', function () {
        res.send({
          success: true,
          id: user.id
        });
      });

      proxy.emit('score_saved');
      // UserProxy.getUserById(req.user.id, proxy.done(function (user) {
      //   user.score += 5;
      //   user.topic_count += 1;
      //   user.save();
      //   req.user = user;
      //   proxy.emit('score_saved');
      // }));

      //发送at消息
      // at.sendMessageToMentionUsers(content, topic.id, req.user.id);
    });
    
  });

  
};

exports.create = create;



