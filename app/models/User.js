'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: String,
  fname: String,
  lname: String,
  username: String,
  password: String,
  picture: String,
  position: String,
  played: Number,
  goals: Number,
  wins: Number,
  games: [Schema.Types.ObjectId],
  pending: [Schema.Types.ObjectId],
  notificationsLevel: Number,
  maxDistance: Number,
  createdAt: {type: Date, default: new Date().toISOString()},
  private: {type: Boolean, default: false}
});

module.exports = mongoose.model('User', UserSchema);
