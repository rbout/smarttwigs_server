import {Document} from "mongoose";

export interface IUser extends Document {
    username:string,
    password:string,
    gamesWon:number,
    totalPointsScored:number
}