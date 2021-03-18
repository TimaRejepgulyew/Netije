import RoomType from "~/components/chat/infrastructure/constants/roomType.js"

export const state = () => ({
    currentRoom: null,
    currentRoomMessages: null,
    needLoading: true,
    userId: null,
    rooms: [],
    messages: {}
})

export const getters = {
    userId(state) {
        return state.userId
    },
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
    checkRoom: state => room => {
        let result = state.rooms.find(element => {
            if (element.id == room.id) {
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
    SET_USER_ID(state, id) {
        state.userId = id
    },
    SET_CURRENT_ROOM(state, room) {
        state.currentRoom = room
        state.currentRoomMessages = state.messages[room.id]
    },
    CLEAR_CURRENT_ROOM(state) {
        state.currentRoom = null
        state.currentRoomMessages = null
    },
    UPDATE_ROOM(state, payload) {
        state.rooms.forEach(element => {
            if (element.id == payload.id) {
                element = payload
                return
            }
        });
    },
    ADD_MESSAGE(state, payload) {
        state.currentRoomMessages.push(payload)
        state.messages[payload.roomId].push(payload)
    },
    ADD_NEW_ROOM(state, payload) {
        state.rooms.unshift(payload)
    },
    SET_MESSAGES(state, payload) {
        state.messages[payload.roomId] = payload.messages
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