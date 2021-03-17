import SocketIO from 'socket.io-client'

const employeeId = 21

export default function ({ store }, inject) {
    // store.commit("chatStore/SET_ROOMS", rooms)
    const server = "http://192.168.4.159:5000"
    const token = store.getters["oidc/oidcAccessToken"]
    const options = {
        reconnectionDelayMax: 10000,
        path: "/socket",
        auth: {
            employeeId: employeeId,
            token: token
        }
    }
    const socket = SocketIO(server, options)
    socket.on("connect", () => {
        console.log("Connected to chat");
        socket.emit("allRooms");
        setTimeout(() => {
            // store.commit("chatStore/SET_USER_ID", employeeId)
            store.commit("chatStore/SET_USER_ID", store.getters["user/employeeId"])
        }, 1000)
    });
    socket.on("joinedToRoom", (data) => {
        console.log("joinedToRoom", data);
        store.commit("chatStore/ADD_NEW_ROOM", data)
    });
    socket.on("message", (data) => {
        console.log("message", data);
        store.commit("chatStore/ADD_MESSAGE", data)
    });
    socket.on("roomUpdate", (data) => {
        console.log("roomUpdate", data);
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

    class ChatInterface {
        static sendMessage(msg) {
            socket.emit("message", msg, (data) => {
                console.log(data);
            });
        }
        static messagesByRoomId(roomId) {
            socket.emit("messagesByRoomId", roomId);
        }
        static createRoom(userId, roomType = 0) {
            console.log("create room", userId);
            socket.emit("createRoom", userId, roomType);
        }
        static readMessagesInRoom(roomId) {
            console.log(roomId)
            socket.emit("readMessagesInRoom", roomId);
        }
    }

    inject("chat", ChatInterface);
}
