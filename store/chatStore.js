import RoomType from "~/components/chat/infrastructure/constants/roomType.js"

export const state = () => ({
    currentRoom: null,
    currentRoomMessages: null,
    needLoading: true,
    userId: null,
    rooms: [],
    messages: {
        23: [
            {
                me: true,
                message: "Hello",
                time: new Date()
            },
            {
                me: false,
                message: "Дратути",
                time: new Date()
            },
            {
                me: true,
                message: "Рамзамзам"
            },
            {
                me: false,
                message: "Локопоко"
            },
            {
                me: true,
                message: "Hello"
            },
            {
                me: false,
                message:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                time: new Date()
            },
            {
                me: true,
                message:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                time: new Date()
            },
            {
                me: false,
                message: "Локопоко"
            },
            {
                me: true,
                message: "Hello"
            },
            {
                me: false,
                message: "Дратути"
            },
            {
                me: true,
                message: "Рамзамзам"
            },
            {
                me: false,
                message: "Локопоко"
            },
            {
                me: true,
                message: "Hello"
            },
            {
                me: false,
                message: "Дратути"
            },
            {
                me: true,
                message: "Рамзамзам"
            },
            {
                me: false,
                message: "Локопоко"
            },
            {
                me: true,
                message: "Hello"
            },
            {
                me: false,
                message: "Дратути"
            },
            {
                me: true,
                message: "Рамзамзам"
            },
            {
                me: false,
                message: "Локопоко"
            },
            {
                me: true,
                message: "Hello"
            },
            {
                me: false,
                message: "Дратути"
            },
            {
                me: true,
                message: "Рамзамзам"
            },
            {
                me: false,
                message: "Локопоко"
            },
            {
                me: true,
                message: "Hello"
            },
            {
                me: false,
                message: "Дратути"
            },
            {
                me: true,
                message: "Рамзамзам"
            },
            {
                me: false,
                message: "Локопоко"
            }
        ],
        54: [
            {
                me: false,
                message:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                time: new Date()
            },
            {
                me: true,
                message:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                time: new Date()
            },
        ]
    }
})

export const getters = {
    currentRoom(state) {
        return state.currentRoom
    },
    currentRoomMessages(state) {
        return state.currentRoomMessages
    },
    rooms(state) {
        return state.rooms
    },
    needLoading(state) {
        return state.needLoading
    }
}

export const mutations = {
    SET_USER_ID(state, id) {
        state.userId = id
    },
    SET_CURRENT_ROOM(state, id) {
        state.rooms.forEach(element => {
            if (element.id === id) {
                state.currentRoom = element
                for (let key in state.messages) {
                    if (key == id) {
                        state.currentRoomMessages = state.messages[key]
                        state.needLoading = false
                        return
                    }
                }
                return
            }
        });
    },
    SET_ROOMS(state, payload) {
        let rooms = payload.map((room) => {
            switch (room.roomType) {
                case RoomType.Private:
                    let opponent = room.members[0].id == state.userId ? room.members[1] : room.members[0];
                    return {
                        id: room["_id"],
                        employeeId: opponent.id,
                        roomType: room.roomType,
                        roomName: opponent.name,
                        roomJobTitle: opponent.jobTitle,
                        roomPhotoHash: opponent.personalPhotoHash ? opponent.personalPhotoHash : false,
                        lastMessage: room.lastMessage
                    }
                case RoomType.Group:
                    return {
                        id: room["_id"],
                        roomType: room.roomType,
                        roomName: room.name,
                        members: room.members,
                        lastMessage: room.lastMessage
                        // roomPhotoHash: 
                    }
                default:
                    console.error("Group type not defined");
                    break;
            }
        })
        state.rooms = rooms
    }
}

export const actions = {

}