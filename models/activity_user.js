var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId;

var ActivityUserSchema = new Schema({
  name: { type: String },
  phone: { type: String},
  address: { type: String},
  activty_user_id: { type: ObjectId },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }
});

ActivityUserSchema.plugin(BaseModel);
ActivityUserSchema.index('phone', {unique: true});
ActivityUserSchema.index({activty_user_id: 1});

mongoose.model('ActivityUser', ActivityUserSchema);