'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  profile: {
    email: String,
    fname: String,
    lname: String,
    username: String,
    birthdate: {type: Date, default: new Date().toISOString()},
    picture: String
  },
  infos: {
    favorites: {
      position: String,
      place: String,
    },
    availability: {
      monday: {
        available: Boolean,
        from: String,
        to: String
      },
      tuesday: {
        available: Boolean,
        from: String,
        to: String
      },
      wednesday: {
        available: Boolean,
        from: String,
        to: String
      },
      thursday: {
        available: Boolean,
        from: String,
        to: String
      },
      friday: {
        available: Boolean,
        from: String,
        to: String
      },
      saturday: {
        available: Boolean,
        from: String,
        to: String
      },
      sunday: {
        available: Boolean,
        from: String,
        to: String
      }
    }
  },
  statistics: {
    games: Number,
    goals: Number,
    wins: Number
  },
  friends: [Schema.Types.ObjectId],
  teams: [Schema.Types.ObjectId],
  games: [Schema.Types.ObjectId],
  chats: [Schema.Types.ObjectId],
  settings: {
    notificationsLevel: Number,
    maxDistance: Number
  },
  createdAt: {type: Date, default: new Date().toISOString()},
  private: {type: Boolean, default: false}
});

module.exports = mongoose.model('User', UserSchema);
