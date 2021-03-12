import SocketIO from 'socket.io-client'


const rooms = [
    {
        id: "1",
        name: "Mammedow Hoaj Kaltushka",
        avatar: "676e6a63-8497-498b-af81-6cdf6ed2bb5d",
        user: {
            jobTitle: "Главный бухгалтер",
            id: 20,
        },
        lastMessage: {
            text: "Откуда Ты?",
            id: "213123123",
            author: {
                id: 20,
                jobTitle: "Главный бухгалтер",
                name: "Mammedow Hoaj Kaltushka",
                personalPhotoHash: "676e6a63-8497-498b-af81-6cdf6ed2bb5d",
            }
        },
        unreadMessageCount: 12,
        lastRead: new Date(),
        roomType: 0
    },
    {
        id: "2",
        name: "Kent Klark Supermenovich",
        avatar: null,
        user: {
            id: 21,
            jobTitle: "Секретарь",
        },
        lastMessage: {
            text: "Грязный нигер",
            id: "321234",
            author: {
                id: 21,
                jobTitle: "Секретарь",
                name: "Kent Klark Supermenovich",
                personalPhotoHash: null,
            }
        },
        unreadMessageCount: 12,
        lastRead: new Date(),
        roomType: 0
    },
]

const message = [
    {
        text: "Лохи лохи",
        id: "321234",
        author: {
            id: 21,
            jobTitle: "Секретарь",
            name: "Kent Klark Supermenovich",
            personalPhotoHash: null,
        }
    }
]


export default function ({ store }, inject) {
    store.commit("chatStore/SET_ROOMS", rooms)

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
        // store.commit("chatStore/SET_ROOMS", data)
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
            setTimeout(() => {
                socket.emit("messagesByRoomId", roomId);
            }, 5000)
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
