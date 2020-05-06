import {Document} from "mongoose";

export interface IGame extends Document {
    firstUser:string,
    secondUser:string,
    firstUserScore:number,
    secondUserScore:number,
}