import SocketIO from "socket.io-client";
import MessageService from "~/components/chat/infrastructure/services/message.service";
import RoomService from "~/components/chat/infrastructure/services/room.service";

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

    socket.on("joinedToRoom", data => {
        console.log("joinedToRoom", data);
        store.commit("chatStore/JOINED_TO_ROOM", data);
    });
    socket.on("message", data => {
        console.log("message", data);
        store.commit("chatStore/ADD_MESSAGE", data);
    });

    class ChatControler {
        static async sendMessage(msg) {
            const data = await MessageService.postMessages(app, msg);
            console.log("emitMessage", data);
            store.commit("chatStore/ADD_MESSAGE", data);

        }
        static async messagesByRoomId(payload) {
            const data = await MessageService.getMessages(app, payload);
            store.commit("chatStore/SET_MESSAGES", data);
        }

        static async createPrivateRoom(user, roomType = 0) {
            console.log("emitCreateRoom", user, roomType);
            const room = await RoomService.createPrivateRoom(app, {
                members: [user.id],
                roomType
            });
            store.commit("chatStore/ADD_NEW_ROOM", room);
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
        
        static connect() {
            options.extraHeaders.access_token = `${store.getters["oidc/oidcAccessToken"]}`;
            socket.connect();
        }
    }

    inject("chat", ChatControler);
};
