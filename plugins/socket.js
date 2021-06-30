import SocketIO from "socket.io-client";
import MessageService from "~/components/chat/infrastructure/services/message.service";
import RoomService from "~/components/chat/infrastructure/services/room.service";
import RoomTypes from "~/components/chat/infrastructure/constants/roomType";
export default async ({ app, store }, inject) => {
    const options = {
        reconnectionDelayMax: 10000,
        path: "/socket",
        autoConnect: true,
        auth: {},
        extraHeaders: {
            Authorization: `Bearer ${store.getters["oidc/oidcAccessToken"]}`
        },
    };
    const socket = new SocketIO(process.env.chatServerUrl, options);

    socket.on("connect", msg => {
        ChatControler.allRooms();
    });
    socket.on("userOnline", data => {
        store.dispatch("chatStore/userOnline", data);
    });
    socket.on("userOffline", data => {
        store.dispatch("chatStore/userOffline", data);
    });
    socket.on("joinedToRoom", data => {
        store.commit("chatStore/ADD_NEW_ROOM", data);
        socket.emit("joinToRoom", data.id);
    });
    socket.on("message", data => {
        const ownId = store.getters["user/employeeId"];
        if (data.author.id === ownId)
            store.dispatch("chatStore/sendMessage", data);
        else {
            store.dispatch("chatStore/getMessage", data);
            app.$message(app, data);
        }
    });
    class ChatControler {
        static async invateToRoom(roomId, users) {
            RoomService.inviteToRoom(app, roomId, users);
        }
        static async sendMessage(msg) {
            const data = await MessageService.postMessages(app, msg)
            store.dispatch("chatStore/sendMessage", data);
        }
        static async sendFiles(msg) {
            const data = await MessageService.postFiles(app, msg);
            store.dispatch("chatStore/sendMessage", data);
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
            return roomId;
        }

        static markAsRead(roomId) {
            MessageService.markAsRead(app, roomId);
        }

        static async allRooms() {
            const rooms = await RoomService.allRooms(app);
            store.commit("chatStore/SET_ROOMS", rooms);
        }

        static connect() {
            options.extraHeaders.access_token = `${store.getters["oidc/oidcAccessToken"]}`;
            socket.connect();
        }
    }

    inject("chat", ChatControler);
};
