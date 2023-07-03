"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const Room_1 = require("./Room");
const port = 9090;
// Create Express
const app = (0, express_1.default)();
app.use(cors_1.default);
// Http Server
const server = http_1.default.createServer(app);
// WebSocket Server
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
io.on("connection", (socket) => {
    console.log("User is connected");
    (0, Room_1.roomHandler)(socket);
});
server.listen(port, () => {
    console.log("Server started");
});
