'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
  teams: [Schema.Types.ObjectId],
  peoples: [Schema.Types.ObjectId],
  createdAt: {type: Date, default: new Date().toISOString()},
  messages: String, // Messages are stored in a specific collection and retrieved by the collection `_name` property
  game: Schema.Types.ObjectId
});

module.exports = mongoose.model('Chat', ChatSchema);
