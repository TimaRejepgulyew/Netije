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
    socket.on("userOnline", data => {
        store.dispatch("chatStore/userOnline", data);
        console.log("userOnline", data);
    });
    socket.on("userOffline", data => {
        store.dispatch("chatStore/userOffline", data);
        console.log("userOffline", data);
    });
    socket.on("joinedToRoom", data => {
        console.log("joinedToRoom", data);
        socket.emit("joinToRoom", data.id);
    });
    socket.on("message", data => {
        console.log("message", data);
        const ownId = store.getters["user/employeeId"];
        if (data.author.id === ownId)
            store.dispatch("chatStore/sendMessage", data);
        else store.dispatch("chatStore/getMessage", data);
    });
    socket.on("roomUpdated", data => {
        console.log("roomUpdated", data);
        store.commit("chatStore/UPDATE_ROOM", data);
    });
    class ChatControler {
        static async invateToRoom(roomId, users) {
            RoomService.inviteToRoom(app, roomId, users);
        }
        static async sendMessage(msg) {
            const data = await MessageService.postMessages(app, msg);
            console.log("emitMessage", data);
        }
        static async sendFiles(msg) {
            const data = await MessageService.postFiles(app, msg);
            console.log("emitFiles", data);
        }
        static async messagesByRoomId(payload) {
            const data = await MessageService.getMessages(app, payload);
            store.commit("chatStore/SET_MESSAGES", data);
        }
        static async createGroupRoom({ members, name }) {
            const roomId = await RoomService.createGroupRoom(app, {
                members,
                name,
                roomType: RoomTypes.Group
            });
            return roomId;
        }
        static async createPrivateRoom(members) {
            const roomId = await RoomService.createPrivateRoom(app, {
                members,
                roomType: RoomTypes.Private
            });
            console.log("socket", roomId);
            return roomId;
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
