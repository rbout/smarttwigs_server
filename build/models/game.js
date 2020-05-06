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
var GameSchema = new mongoose.Schema({
    firstUser: {
        type: String
    },
    secondUser: {
        type: String
    },
    firstUserScore: {
        type: Number
    },
    secondUserScore: {
        type: Number
    }
});
exports.Game = mongoose.model('Game', GameSchema);
