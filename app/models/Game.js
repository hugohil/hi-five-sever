'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
  description: String,
  // date: {type: Date, default: new Date().toISOString()},
  date: String,
  place: String,
  price: Number,
  organizer: Schema.Types.ObjectId,
  pending: [Schema.Types.ObjectId],
  teamA: [Schema.Types.ObjectId],
  teamB: [Schema.Types.ObjectId],
  private: {type: Boolean, default: false},
  createdAt: {type: Date, default: new Date().toISOString()}
});

module.exports = mongoose.model('Game', GameSchema);
