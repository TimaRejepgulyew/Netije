import dataApi from "~/static/dataApi";
export default class RoomService {
    static async allRooms(ctx) {
        const { data } = await ctx.$axios.get(
            `${dataApi.chat.Room}`
        );
        return data;
    }
    static async createPrivateRoom(ctx, room) {
        const { data } = await ctx.$axios.post(
            `${dataApi.chat.CreatePrivateRoom}`,
            room
        );
        ctx.store.commit("chatStore/ADD_NEW_ROOM", data);
        return data.id;
    }
    static async createGroupRoom(ctx, room) {
        const { data } = await ctx.$axios.post(
            `${dataApi.chat.CreateGroupRoom}`,
            room
        );
        ctx.store.commit("chatStore/ADD_NEW_ROOM", data);
        return data.id;
    }
    static async inviteToRoom(ctx, roomId, users) {
        const { data: members } = await ctx.$axios.post(
            `${dataApi.chat.InviteToRoom}/${roomId}`,
            users
        );
        ctx.store.commit("chatStore/ADD_NEW_MEMBERS", { roomId, members });
    }
    static async leaveRoom(ctx, roomId) {
        await ctx.$axios.post(
            `${dataApi.chat.InviteToRoom}`,
            roomId
        );
        ctx.store.commit("chatStore/LEAVE_ROOM", roomId);
    }
}
