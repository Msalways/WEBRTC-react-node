import express from "express"
import http from 'http'
import {Server} from 'socket.io'
import cors from 'cors'
import {roomHandler} from './Room'

const port = 9090

// Create Express
const app = express()
app.use(cors)
// Http Server
const server = http.createServer(app)
// WebSocket Server
const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})

io.on("connection",(socket)=>{
    console.log("User is connected");
    roomHandler(socket)
})

server.listen(port,()=>{
    console.log("Server started");

})