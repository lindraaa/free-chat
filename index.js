const express = require("express");
const app = express();
const PORT = 3000;

//server
const {createServer} = require("node:http");
const server = createServer(app)

//path
const {join} = require("node:path");

//socket
const {Server} = require("socket.io")
const io = new Server(server)
app.get("/",(req,res)=>{
    res.sendFile(join(__dirname,"index.html"));
})


io.on('connection',(socket)=>{
    console.log("A new user connected")
    socket.broadcast.emit("user_connected", "A new user"); 
    socket.on('chat_message',({data,user})=>{
        console.log(`message: ${data} ${user}`)
        io.emit('chat_message',data)
    })
    socket.on('disconnect',()=>{
        console.log("user was disconnected")
        socket.broadcast.emit("user_disconnected","The user ")
    })
})

server.listen(PORT, ()=>{
    console.log(`Connected on the port http://localhost:${PORT}`);
})

