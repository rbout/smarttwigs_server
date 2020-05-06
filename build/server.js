"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var cors_1 = __importDefault(require("cors"));
var StrongParamsMiddleware_1 = require("./middleware/StrongParamsMiddleware");
var user_1 = require("./models/user");
var game_1 = require("./models/game");
var app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default({ origin: 'http://localhost:3000' }));
mongoose_1.default.connect("mongodb+srv://rbout:pw123@cluster0-aqced.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose_1.default.connection;
db.once('open', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log('connected to mongodb');
        return [2 /*return*/];
    });
}); });
var port = 4000;
app.post('/user', [StrongParamsMiddleware_1.strongParamsMiddleware({ username: 'string', password: 'string' })], function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var strongParams, username, password, newPassword, user;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                strongParams = (_a = response.locals) === null || _a === void 0 ? void 0 : _a.strongParams;
                username = (_b = strongParams) === null || _b === void 0 ? void 0 : _b.username;
                password = (_c = strongParams) === null || _c === void 0 ? void 0 : _c.password;
                if (!(username !== '' && password !== '')) return [3 /*break*/, 2];
                newPassword = bcryptjs_1.default.hashSync(password, 10);
                user = new user_1.User({
                    username: username,
                    password: newPassword,
                    totalPointsScored: 0,
                    gamesWon: 0
                });
                return [4 /*yield*/, user.save()];
            case 1:
                _d.sent();
                return [2 /*return*/, response.sendStatus(200)];
            case 2: return [2 /*return*/, response.sendStatus(400)];
        }
    });
}); });
app.post('/user/isValid', [StrongParamsMiddleware_1.strongParamsMiddleware({ username: 'string', password: 'string' })], function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var strongParams, username, password, user;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                strongParams = (_a = response.locals) === null || _a === void 0 ? void 0 : _a.strongParams;
                username = (_b = strongParams) === null || _b === void 0 ? void 0 : _b.username;
                password = (_c = strongParams) === null || _c === void 0 ? void 0 : _c.password;
                if (!(username !== '' && password !== '')) return [3 /*break*/, 2];
                return [4 /*yield*/, user_1.User.findOne({ username: username })];
            case 1:
                user = _d.sent();
                if (user && bcryptjs_1.default.compareSync(password, user.password)) {
                    return [2 /*return*/, response.sendStatus(200)];
                }
                _d.label = 2;
            case 2: return [2 /*return*/, response.sendStatus(400)];
        }
    });
}); });
app.get('/user', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var users, newUsers, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_1.User.find({})];
            case 1:
                users = _a.sent();
                newUsers = users.map(function (user) {
                    return {
                        username: user.username,
                        totalPointsScored: user.totalPointsScored,
                        gamesWon: user.gamesWon
                    };
                });
                return [2 /*return*/, response.status(200).send(newUsers)];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post('/game', [StrongParamsMiddleware_1.strongParamsMiddleware({ firstUser: 'string', secondUser: 'string' })], function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var strongParams, firstUser, secondUser, game;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                strongParams = (_a = response.locals) === null || _a === void 0 ? void 0 : _a.strongParams;
                firstUser = (_b = strongParams) === null || _b === void 0 ? void 0 : _b.firstUser;
                secondUser = (_c = strongParams) === null || _c === void 0 ? void 0 : _c.secondUser;
                game = new game_1.Game({
                    firstUser: firstUser,
                    secondUser: secondUser,
                    firstUserScore: 0,
                    secondUserScore: 0
                });
                return [4 /*yield*/, game.save()];
            case 1:
                _d.sent();
                return [2 /*return*/, response.sendStatus(200)];
        }
    });
}); });
app.post('/user/score', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var username, user, newUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = request.body.username;
                return [4 /*yield*/, user_1.User.findOne({ username: username })];
            case 1:
                user = _a.sent();
                if (!(user !== null)) return [3 /*break*/, 4];
                newUser = new user_1.User({
                    username: user.username,
                    password: user.password,
                    totalPointsScored: user.totalPointsScored + request.body.pointsScored,
                    gamesWon: user.gamesWon
                });
                return [4 /*yield*/, user_1.User.deleteOne({ username: username })];
            case 2:
                _a.sent();
                return [4 /*yield*/, newUser.save()];
            case 3:
                _a.sent();
                return [2 /*return*/, response.sendStatus(200)];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () { return console.log('server is up'); });
module.exports = app;
