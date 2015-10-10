'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  chat: Schema.Types.ObjectId,
  createdAt: {type: Date, default: new Date().toISOString()},
  message: String,
  author: Schema.Types.ObjectId
});

module.exports = mongoose.model('Message', MessageSchema);