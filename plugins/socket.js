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

    const rooms = [
        {
            roomType: 0,
            members: [
                {
                    businessUnitId: 16,
                    dateOfAppointment: null,
                    dateOfDismissal: null,
                    departmentId: 19,
                    description: "Главный бухгалтер",
                    email: null,
                    id: 20,
                    isSystem: false,
                    jobTitle: "Главный бухгалтер",
                    jobTitleId: 1,
                    name: "user1 user1",
                    note: null,
                    personId: 5,
                    personalPhotoHash: "595d3e23-4711-4672-8f9a-c23fcd0c5df4",
                    phone: null,
                    recipientType: 4,
                    status: 0,
                    userName: "user1"
                },
                {
                    businessUnitId: 16,
                    dateOfAppointment: null,
                    dateOfDismissal: null,
                    departmentId: 19,
                    description: "Главный бухгалтер",
                    email: null,
                    id: 13,
                    isSystem: false,
                    jobTitle: "Главный бухгалтер",
                    jobTitleId: 1,
                    name: "Linkoln Abraam Igoryevic",
                    note: null,
                    personId: 6,
                    personalPhotoHash: null,
                    phone: null,
                    recipientType: 4,
                    status: 0,
                    userName: "asd"
                }
            ],
            id: 23,
            created: new Date(),
            lastMessage: "Лалала",
            name: "Окулист Егор",
        },
        {
            roomType: 1,
            members: [
                {
                    businessUnitId: 16,
                    dateOfAppointment: null,
                    dateOfDismissal: null,
                    departmentId: 19,
                    description: "Главный бухгалтер",
                    email: null,
                    id: 20,
                    isSystem: false,
                    jobTitle: "Главный бухгалтер",
                    jobTitleId: 1,
                    name: "user1 user1",
                    note: null,
                    personId: 5,
                    personalPhotoHash: "595d3e23-4711-4672-8f9a-c23fcd0c5df4",
                    phone: null,
                    recipientType: 4,
                    status: 0,
                    userName: "user1"
                },
                {
                    businessUnitId: 16,
                    dateOfAppointment: null,
                    dateOfDismissal: null,
                    departmentId: 19,
                    description: "Главный бухгалтер",
                    email: null,
                    id: 13,
                    isSystem: false,
                    jobTitle: "Главный бухгалтер",
                    jobTitleId: 1,
                    name: "Linkoln Abraam Igoryevic",
                    note: null,
                    personId: 6,
                    personalPhotoHash: null,
                    phone: null,
                    recipientType: 4,
                    status: 0,
                    userName: "asd"
                }
            ],
            id: 54,
            created: new Date(),
            lastMessage: "Лалала",
            name: "Анонимные Алкоголики"
        },
    ]

    const socket = SocketIO(server, options)
    store.commit("chatStore/SET_ROOMS", rooms)
    socket.on("connect", () => {
        console.log("Connected to chat");
        setTimeout(() => {
            store.commit("chatStore/SET_USER_ID", store.getters["user/employeeId"])
        }, 0)
        socket.emit("allRooms");
        // socket.emit("allRooms", (rooms) => {
        //     console.log("rooms", rooms);
        // })
    });
    socket.on("joinedToRoom", (data) => {
        console.log("joinedToRoom", data);
    });
    socket.on("message", (data) => {
        console.log("message", data);
    });
    socket.on("allRooms", (data) => {
        console.log("allRooms", data);
    });

    class ChatInterface {
        static sendMessage(msg) {
            socket.emit("message", {
                roomId: "60422aea0818df444cc1ccd7",
                text: msg
            });
        }
        static createRoom(room) {
            socket.emit("createRoom", room);
        }
    }

    inject("chat", ChatInterface);
}
