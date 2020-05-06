"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = __importStar(require("mongoose"));
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
        validate: {
            message: 'password hash needs to start with $2',
            validator: function (value) {
                return value.substr(0, 2) === '$2';
            }
        }
    },
    gamesWon: {
        type: Number
    },
    totalPointsScored: {
        type: Number
    }
});
exports.User = mongoose.model('User', UserSchema);
