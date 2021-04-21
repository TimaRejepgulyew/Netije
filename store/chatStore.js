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
    JOINED_TO_ROOM(state, payload) {
        state.rooms.unshift(payload)
    },
    ADD_MESSAGE(state, payload) {
        if (state.messages[payload.roomId]) {
            // state.rooms.find(payload.roomId).messageCount
            state.messages[payload.roomId].push(payload)
        } else {
            state.rooms.forEach(room => {
                if (room.id === payload.roomId) {
                    room.messageCount++
                }
            })
            console.log("No room message");
        }
    },
    ADD_NEW_ROOM(state, payload) {
        state.rooms.unshift(payload)
    },
    SET_MESSAGES(state, { data } = payload) {
        let messages = data.messages.reverse()
        if (state.messages[data.roomId]) {
            state.messages[data.roomId].unshift(...messages)
        } else {
            state.messages[data.roomId] = messages
        }
        state.currentRoomMessages = state.messages[data.roomId]
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
