import RoomType from "~/components/chat/infrastructure/constants/roomType.js";

export const state = () => ({
    rooms: [],
    messages: {}
});

export const getters = {
    rooms(state) {
        return state.rooms;
    },
    hasPrivatRoomWith: state => userId => {
        return state.rooms.find(room => {
            return (
                room.roomType === RoomType.Private &&
                members.some(member => member.id === userId)
            );
        });
    },
    getRoom: state => roomId => {
        return state.rooms.find(room => room.id === roomId);
    },
    hasMessages: state => roomId => {
        return state.messages[roomId.toString()] ? true : false;
    },
    getMessages: state => roomId => {
        return state.messages[roomId.toString()];
    }
};
export const mutations = {
    MARK_AS_READ(state, roomId) {
        const currentRoom = state.rooms.find(room => room.id === roomId);
        if (currentRoom) {
            currentRoom.unreadMessageCount = 0;
            currentRoom.unreadMessage = null;
            currentRoom.lastRead = new Date();
        }
    },
    ADD_MESSAGE(state, message) {
        if (getters["hasMessages"](message.roomId)) {
            state.messages[message.roomId].push(message);
            return;
        } else {
            state.messages[message.roomId].push(message);
            return;
        }
    },
    ADD_NEW_ROOM(state, room) {
        state.rooms.unshift(room);
    },
    SET_MESSAGES(state, data) {
        if (state.messages[data.roomId.toString()]) {
            state.messages[data.roomId.toString()] = [
                ...state.messages[data.roomId.toString()],
                ...data.messages
            ];
        } else {
            state.messages[data.roomId.toString()] = data.messages;
        }
    },
    SET_ROOMS(state, payload) {
        state.rooms = payload;
    },
    INCREMENT_MESSAGE_COUNT(state, message) {
        state.rooms = state.rooms.map(room => {
            if (room.id === message.id) {
                room.messageCount++;
                room.lastMessage = message;
                return room;
            }
            return room;
        });
    },
    INCREMENT_UNREAD_MESSAGE_COUNT(state, message) {
        state.rooms = state.rooms.map(room => {
            if (room.id === message.id) {
                if (!room.unreadMessageCount) room.unreadMessage = message;
                room.unreadMessageCount++;
                return room;
            }
            return room;
        });
    }
};

export const actions = {
    sendMessage({ commit }, message) {
        commit("INCREMENT_MESSAGE_COUNT", message);
        commit("ADD_MESSAGE", message);
    },
    getMessage({ commit }, message) {
        commit("INCREMENT_UNREAD_MESSAGE_COUNT", message);
        commit("INCREMENT_MESSAGE_COUNT", message);
        commit("ADD_MESSAGE", message);
    }
};
