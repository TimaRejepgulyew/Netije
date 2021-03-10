import SocketIO from 'socket.io-client'

export default function ({ store }, inject) {

    const server = "http://192.168.4.159:5000"
    const token = store.getters["oidc/oidcAccessToken"]
    const options = {
        reconnectionDelayMax: 10000,
        path: "/socket",
        auth: {
            employeeId: 1,
            token: token
        }
    }

    const socket = SocketIO(server, options)
    socket.on("connect", () => {
        console.log("Connected to chat");
        socket.emit("allRooms");
        setTimeout(() => {
            store.commit("chatStore/SET_USER_ID", store.getters["user/employeeId"])
        }, 0)
    });
    socket.on("joinedToRoom", (data) => {
        console.log("joinedToRoom", data);
    });
    socket.on("message", (data) => {
        console.log("message", data);
        store.commit("chatStore/ADD_MESSAGE", data)
    });
    socket.on("allRooms", (data) => {
        store.commit("chatStore/SET_ROOMS", data)
        console.log("allRooms", data);
    });
    socket.on("messagesByRoomId", (data) => {
        console.log("messagesByRoomId", data);
        store.commit("chatStore/SET_MESSAGES", data)
    });

    class ChatInterface {
        static sendMessage(msg) {
            socket.emit("message", msg, (data) => {
                console.log(data);
            });
        }
        static messagesByRoomId(roomId) {
            socket.emit("messagesByRoomId", roomId);
        }
        static createRoom(room) {
            socket.emit("createRoom", room);
        }
        static readMessagesInRoom(roomId) {
            console.log(roomId)
            socket.emit("readMessagesInRoom", roomId);
        }
    }

    inject("chat", ChatInterface);
}
