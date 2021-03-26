import SocketIO from 'socket.io-client'


export default ({ app, store }, inject) => {
    const options = {
        reconnectionDelayMax: 10000,
        path: "/socket",
        autoConnect: false,
        auth: {}
    }

    const socket = new SocketIO(process.env.chatServerUrl, options)


    setTimeout(() => {
        socket.auth["token"] = `Bearer ${store.getters["oidc/oidcAccessToken"]}`
        socket.connect()
    }, 300)


    socket.on("connect", () => {
        console.log("Connected to chat");
        socket.emit("allRooms");
    });
    socket.on("authorized", () => {
        console.log("Authorized");
        socket.emit("allRooms");
    });

    socket.on("joinedToRoom", (data) => {
        console.log("joinedToRoom", data);
        store.commit("chatStore/ADD_NEW_ROOM", data)
    });
    socket.on("message", (data) => {
        console.log("message", data);
        store.commit("chatStore/ADD_MESSAGE", data)
    });
    socket.on("roomUpdated", (data) => {
        console.log("roomUpdated", data);
        store.commit("chatStore/UPDATE_ROOM", data)
    })
    socket.on("allRooms", (data) => {
        console.log("allRooms", data);
        store.commit("chatStore/SET_ROOMS", data)
    });
    socket.on("messagesByRoomId", (data) => {
        console.log("messagesByRoomId", data);
        store.commit("chatStore/SET_MESSAGES", data)
    });

    class ChatControler {
        static sendMessage(msg) {
            console.log("emitMessage", msg);
            socket.emit("message", msg);
        }
        static messagesByRoomId(roomId) {
            console.log("emitMessagesByRoomId", roomId);
            socket.emit("messagesByRoomId", roomId);
        }
        static createRoom(userId, roomType = 0) {
            console.log("emitCreateRoom", userId, roomType);
            socket.emit("createRoom", userId, roomType);
        }
        static readMessagesInRoom(roomId) {
            console.log("emitReadMessagesInRoom", roomId);
            socket.emit("readMessagesInRoom", roomId);
        }
    }

    inject("chat", ChatControler);
}


