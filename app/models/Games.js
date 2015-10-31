'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
  infos: {
    title: String,
    description: String
  },
  date: {type: Date, default: new Date().toISOString()},
  place: Schema.Types.ObjectId || String, // Either a `Places` document or a String formatted address
  price: Number,
  peoples: {
    organizer: Schema.Types.ObjectId,
    pending: [Schema.Types.ObjectId],
    attending: {
      teamA: [Schema.Types.ObjectId],
      teamB: [Schema.Types.ObjectId]
    },
    declined: [Schema.Types.ObjectId]
  },
  private: {type: Boolean, default: false},
  createdAt: {type: Date, default: new Date().toISOString()}
});

module.exports = mongoose.model('Game', GameSchema);
