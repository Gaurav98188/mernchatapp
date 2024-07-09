import express from "express";

import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errormiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";

import {Server} from 'socket.io';

import {createServer} from 'http';
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/event.js";

import {v4 as uuid} from "uuid";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";
//import { createGroupChats, createMessagesInAChat, createSingleChats} from "./seeders/chat.js";


//middle ware to parse JSON BODIES


dotenv.config({
    path:"./.env",
})
const mongoURI = process.env.MONGO_URI;

const PORT = process.env.PORT || 8000;

const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";

const adminSecretKey = process.env.ADMIN_SECRET_KEY || "gauravpaswancoder";

const userSocketIDs = new Map();

connectDB(mongoURI);


const app = express();

const server = createServer(app);

const io = new Server(server, {});

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use("/user",userRoute);
app.use("/chat",chatRoute);
app.use("/admin",adminRoute);
app.get("/",(req,res)=>{
    res.send("HELLO WORLD")
})
//to be done in frontend
io.use((socket,next)=>{
    
});


io.on("connection",(socket)=>{

    //socket.handshake.query.auth send token





    const user = {
        _id:"dfldkfj",
        name:"djflkdfj"
    }

    userSocketIDs.set(user._id.toString(),socket.id);//currently active users online
    console.log(userSocketIDs)
    console.log("a user connected", socket.id);

    socket.on(NEW_MESSAGE,async ({chatId,members,message})=>{

        const messageForRealTime = {
            content:message,
            _id:uuid(),
            sender:{
                _id:user._id,
                name:user.name
            },
            chat:chatId,
            createdAt:new Date().toISOString(),
        }
        
        const membersSockets = getSockets(members);

        io.to(membersSockets).emit(NEW_MESSAGE,{
            chatId,
            message: messageForRealTime,
        });

        io.to(membersSockets).emit(NEW_MESSAGE_ALERT,{chatId});
    
       // console.log("New MESSAGE",messageForRealTime);
        try {
            await Message.create(messageForDB);
            
        } catch (error) {
            console.log(error);
            
        }
        const messageForDB = {
            content:message,
            sender:user._id,
            chat:chatId
        }


    })

    socket.on("disconnect",()=>{
        console.log("user disconnected");

        userSocketIDs.delete(user._id.toString());
    })
})


app.use(errormiddleware)

//createMessages(50);

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}  in ${envMode} mode`)
})

export {
    envMode,
    adminSecretKey
}