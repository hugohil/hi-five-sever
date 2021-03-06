'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaceSchema = new Schema({
  name: String,
  description: String,
  url: String,
  location: {
    address: String,
    lat: Number,
    lon: Number
  },
  fields: Number,
  createdAt: {type: Date, default: new Date().toISOString()},
  contact: Schema.Types.ObjectId || String
});

module.exports = mongoose.model('Place', PlaceSchema);