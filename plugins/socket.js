import SocketIO from "socket.io-client";
import MessageService from "~/components/chat/infrastructure/services/message.service";
import RoomService from "~/components/chat/infrastructure/services/room.service";
import RoomTypes from "~/components/chat/infrastructure/constants/roomType";
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

    socket.on("connect", msg => {
        console.log("Connected to chat");
        ChatControler.allRooms();
    });
    socket.on("userOnline", user => {
        console.log("userOnline", user);
    });
    socket.on("joinedToRoom", data => {
        console.log("joinedToRoom", data);
        socket.emit("joinToRoom", data.id);
    });
    socket.on("message", data => {
        console.log("message", data);
        store.dispatch("chatStore/getMessage", data);
    });
    socket.on("roomUpdated", data => {
        console.log("roomUpdated", data);
        store.commit("chatStore/UPDATE_ROOM", data);
    });
    socket.on("userOffline", data => {
        console.log("userOffline", data);
    });
    class ChatControler {
        static async sendMessage(msg) {
            const data = await MessageService.postMessages(app, msg);
            console.log("emitMessage", data);
            store.dispatch("chatStore/sendMessage", data);
        }
        static async sendFile(msg) {
            const data = await MessageService.postFiles(app, msg);
            console.log("emitFiles", data);
            store.dispatch("chatStore/sendMessage", data);
        }
        static async messagesByRoomId(payload) {
            const data = await MessageService.getMessages(app, payload);
            store.commit("chatStore/SET_MESSAGES", data);
        }
        static async createGroupRoom({ members, name }) {
            const room = await RoomService.createGroupRoom(app, {
                members,
                name,
                roomType: RoomTypes.Group
            });
            store.commit("chatStore/ADD_NEW_ROOM", room);
            return room.id;
        }
        static async createPrivateRoom(members) {
            const room = await RoomService.createPrivateRoom(app, {
                members,
                roomType: RoomTypes.Private
            });
            store.commit("chatStore/ADD_NEW_ROOM", room);
            return room.id;
        }

        static markAsRead(roomId) {
            console.log("emitmarkAsRead", roomId);
            MessageService.markAsRead(app, roomId);
        }

        static async allRooms() {
            const rooms = await RoomService.allRooms(app);
            console.log("allRoom", rooms);
            store.commit("chatStore/SET_ROOMS", rooms);
        }

        static connect() {
            options.extraHeaders.access_token = `${store.getters["oidc/oidcAccessToken"]}`;
            socket.connect();
        }
    }

    inject("chat", ChatControler);
};
