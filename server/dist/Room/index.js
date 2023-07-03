"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomHandler = void 0;
const uuid_1 = require("uuid");
const rooms = {};
const roomHandler = (socket) => {
    const createRoom = () => {
        console.log("Room Created");
        const roomId = (0, uuid_1.v4)();
        socket.emit("room-created", { roomId });
    };
    const joinRoom = ({ roomId, peerId }) => {
        console.log(rooms);
        if (rooms[roomId]) {
            console.log(`Room Joined to ${roomId} ,${peerId}`);
            socket.join(roomId);
            rooms[roomId].push(peerId);
            socket.emit('get-users', {
                roomId,
                participants: rooms[roomId]
            });
        }
    };
    socket.on("create-room", createRoom);
    socket.on('join-room', joinRoom);
    socket.on("disconnect", () => {
        console.log("User Disconnected");
    });
};
exports.roomHandler = roomHandler;
