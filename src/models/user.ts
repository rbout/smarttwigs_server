import * as mongoose from 'mongoose';
import {IUser} from "../interface/user";

const UserSchema = new mongoose.Schema({
    username: {
        type:String,
    },
    password: {
        type:String,
        validate: {
            message: 'password hash needs to start with $2',
            validator: function (value:string) {
                return value.substr(0,2) === '$2';
            }
        }
    },
    gamesWon: {
        type:Number
    },
    totalPointsScored: {
        type:Number
    }
});

export const User = mongoose.model<IUser>('User', UserSchema);