import RoomType from "~/components/chat/infrastructure/constants/roomType.js"

export const state = () => ({
    currentRoom: null,
    currentRoomMessages: null,
    needLoading: true,
    rooms: [],
    messages: {}
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
    },
    roomByUser: state => user => {
        return state.rooms.find(element => {
            if (element.user.id == user.id) {
                return element
            }
        })
    },
    hasRoom: state => user => {
        let result = state.rooms.find(element => {
            if (element.user.id == user.id) {
                return element
            }
        })
        if (result == undefined) {
            return false
        } else {
            return true
        }
    }
}

export const mutations = {
    SET_CURRENT_ROOM(state, room) {
        state.currentRoom = room
        state.currentRoomMessages = state.messages[room.id]
    },
    CLEAR_CURRENT_ROOM(state) {
        state.currentRoom = null
        state.currentRoomMessages = null
    },
    UPDATE_ROOM(state, payload) {
        if (state.currentRoom?.id == payload.id) {
            state.currentRoom.unreadMessageCount = 0
            console.log("Current room");
        } else {
            let i = state.rooms.findIndex(element => element.id == payload.id)
            state.rooms[i] = payload
            state.rooms.push(null)
            state.rooms.pop()
        }
    },
    ADD_MESSAGE(state, payload) {
        if (state.messages[payload.roomId]) {
            state.messages[payload.roomId].push(payload)
        } else {
            console.log("No room message");
        }
    },
    ADD_NEW_ROOM(state, payload) {
        state.rooms.unshift(payload)
    },
    SET_MESSAGES(state, payload) {
        console.log("payload.messages",payload.messages)
        let messages = payload.messages.reverse()
        console.log("messages",messages)
        if (state.messages[payload.roomId]) {
            state.messages[payload.roomId].unshift(...messages)
        } else {
            state.messages[payload.roomId] = messages
        }
        state.currentRoomMessages = state.messages[payload.roomId]
        state.needLoading = false
    },
    ENABLE_LOAD_PANEL(state) {
        state.needLoading = true
    },
    DISABLE_LOAD_PANEL(state) {
        state.needLoading = false
    },
    SET_ROOMS(state, payload) {
        state.rooms = payload
    }
}

export const actions = {}
