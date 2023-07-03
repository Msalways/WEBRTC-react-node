import {Socket} from "socket.io"
import { v4 as uuidV4 } from "uuid";

const rooms: Record<string,string[]> ={};

interface IRoomParams{
    roomId:string,
    peerId: string
}

export const roomHandler = (socket:Socket)=>{


    const createRoom = () =>{
        console.log("Room Created");
        const roomId = uuidV4();
        socket.emit("room-created",{roomId})
        
    }

    const joinRoom = ({roomId,peerId} : IRoomParams) => {
        console.log(rooms);

        if(rooms[roomId]){
        console.log(`Room Joined to ${roomId} ,${peerId}`);
        socket.join(roomId)
        rooms[roomId].push(peerId)
        socket.emit('get-users',{
            roomId,
            participants : rooms[roomId]

        })
        }
    }
    socket.on("create-room",createRoom)

    socket.on('join-room',joinRoom)

    socket.on("disconnect",()=>{
        console.log("User Disconnected");

    })
}