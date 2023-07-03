"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomHandler = void 0;
const roomHandler = (socket) => {
    socket.on('join-room', () => {
        console.log("User Joins the room");
    });
};
exports.roomHandler = roomHandler;
