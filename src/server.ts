import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import cors from 'cors'
import {strongParamsMiddleware} from "./middleware/StrongParamsMiddleware";
import {User} from "./models/user";
import {Game} from "./models/game";

const app = express();

app.use(express.json());

app.use(cors({origin: 'http://localhost:3000'}));

mongoose.connect("mongodb+srv://rbout:pw123@cluster0-aqced.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.once('open', async () => {
        console.log('connected to mongodb');
});

const port = 4000;

app.post('/user',[strongParamsMiddleware({username:'string',password:'string'})] ,
    async(request:Request,response:Response) => {
        const strongParams = response.locals?.strongParams;
        const username:string|undefined = strongParams?.username;
        const password:string = strongParams?.password;

        if(username !== '' && password !== '') {
                const newPassword = bcrypt.hashSync(password,10);
                const user = new User ({
                        username,
                        password:newPassword,
                        totalPointsScored: 0,
                        gamesWon: 0
                });
                await user.save();
                return response.sendStatus(200);
        }
        else {
                return response.sendStatus(400);
        }
    });

app.post('/user/isValid', [strongParamsMiddleware({username:'string', password:'string'})],
    async(request:Request,response:Response) => {
            const strongParams = response.locals?.strongParams;
            const username:string|undefined = strongParams?.username;
            const password:string = strongParams?.password;

            if(username !== '' && password !== '') {
                    const user = await User.findOne({username});
                    if(user && bcrypt.compareSync(password, user.password)) {
                            return response.sendStatus(200);
                    }
            }
            return response.sendStatus(400)
    });

app.get('/user', async(request:Request,response:Response) => {
        try {
                const users = await User.find({});
                const newUsers = users.map((user) => {
                        return {
                                username: user.username,
                                totalPointsScored: user.totalPointsScored,
                                gamesWon: user.gamesWon
                        };
                });
                return response.status(200).send(newUsers);
        } catch (error) {
                console.log(error);
        }
});

app.post('/game', [strongParamsMiddleware({firstUser:'string', secondUser:'string'})] ,
    async (request:Request, response:Response) => {
        const strongParams = response.locals?.strongParams;
        const firstUser = strongParams?.firstUser;
        const secondUser = strongParams?.secondUser;

        const game = new Game ({
                firstUser,
                secondUser,
                firstUserScore: 0,
                secondUserScore: 0
        });
        await game.save();
        return response.sendStatus(200);
    });

app.post('/user/score', async (request:Request, response:Response) => {
        const username = request.body.username;
        const user = await User.findOne({username});
        if(user !== null) {
                const newUser = new User({
                        username: user.username,
                        password: user.password,
                        totalPointsScored: user.totalPointsScored + request.body.pointsScored,
                        gamesWon: user.gamesWon
                });
                await User.deleteOne({username});
                await newUser.save();
                return response.sendStatus(200);
        }
});

app.listen(port, () => console.log('server is up'));

module.exports = app;