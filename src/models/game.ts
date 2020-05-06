import * as mongoose from 'mongoose';
import {IGame} from "../interface/game";

const GameSchema = new mongoose.Schema({
    firstUser: {
        type: String
    },
    secondUser: {
        type:String
    },
    firstUserScore: {
        type:Number
    },
    secondUserScore: {
        type:Number
    }
});

export const Game = mongoose.model<IGame>('Game', GameSchema);