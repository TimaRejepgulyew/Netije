import SocketIO from "socket.io-client";
import MessageService from "../components/chat/infrastructure/services/message.service";
import RoomService from "../components/chat/infrastructure/services/room.service";

export default async ({ app, store }, inject) => {
    const options = {
        extraHeaders: {
            // Authorization: `Bearer ${store.getters["oidc/oidcAccessToken"]}`
        },
        reconnectionDelayMax: 10000,
        path: "/socket",
        autoConnect: false,
        auth: {}
    };
    const socket = new SocketIO(process.env.chatServerUrl, options);
    setTimeout(() => {
        console.log("socket");
        options.extraHeaders.access_token = `${store.getters["oidc/oidcAccessToken"]}`;
        socket.connect();
    }, 300);

    socket.on("connect", msg => {
        console.log("Connected to chat");
        socket.emit("authenticated", msg);
        ChatControler.allRooms();
    });
    socket.on("authorized", () => {});

    socket.on("joinedToRoom", data => {
        console.log("joinedToRoom", data);
        store.commit("chatStore/ADD_NEW_ROOM", data);
    });
    socket.on("message", data => {
        console.log("message", data);
        store.commit("chatStore/ADD_MESSAGE", data);
    });
    socket.on("roomUpdated", data => {
        console.log("roomUpdated", data);
        store.commit("chatStore/UPDATE_ROOM", data);
    });

    class ChatControler {
        static sendMessage(msg) {
            console.log("emitMessage", msg);
            socket.emit("message", msg);
        }
        static async users() {}
        static async messagesByRoomId(payload) {
            const data = await MessageService.messages(app, payload);
            store.commit("chatStore/SET_MESSAGES", data);
        }

        static createRoom(userId, roomType = 0) {
            console.log("emitCreateRoom", userId, roomType);
            socket.emit("createRoom", userId, roomType);
        }

        static readMessagesInRoom(roomId) {
            console.log("emitReadMessagesInRoom", roomId);
            socket.emit("readMessagesInRoom", roomId);
        }
        static async allRooms() {
            const rooms = await RoomService.allRooms(app);
            console.log("allRoom", rooms);
            store.commit("chatStore/SET_ROOMS", rooms);
        }
    }

    inject("chat", ChatControler);
};
