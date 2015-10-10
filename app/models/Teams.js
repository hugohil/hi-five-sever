'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
  infos: {
    name: String,
    description: String,
    area: String
  },
  createdAt: {type: Date, default: new Date().toISOString()},
  peoples: [Schema.Types.ObjectId],
  chat: Schema.Types.ObjectId,
});

module.exports = mongoose.model('Team', TeamSchema);