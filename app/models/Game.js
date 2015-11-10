'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
  description: String,
  date: String,
  time: String,
  place: String,
  price: Number,
  done: Boolean,
  winner: String,
  organizer: Schema.Types.ObjectId,
  players: [{
    id: Schema.Types.ObjectId,
    team: String
  }],
  private: {type: Boolean, default: false},
  createdAt: {type: Date, default: new Date().toISOString()}
});

module.exports = mongoose.model('Game', GameSchema);
