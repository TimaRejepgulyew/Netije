import dataApi from "~/static/dataApi";
export default class MessageService {
    static async getMessages(ctx, { take, skip, roomId }) {
        const {
            data
        } = await ctx.$axios.get(
            `${process.env.chatServerUrl}${dataApi.chat.Message}/${roomId}`,
            { params: { take, skip } }
        );
        return data;
    }
    static async markAsRead(ctx, roomId) {
        const { data } = await ctx.$axios.post(
            `${process.env.chatServerUrl}${dataApi.chat.MarkAsRead}`,
            {
                roomId
            }
        );
        ctx.store.commit("chatStore/MARK_AS_READ", roomId);
    }
    static async postMessages(ctx, payload) {
        const { data } = await ctx.$axios.post(
            `${process.env.chatServerUrl}${dataApi.chat.Message}`,
            payload
        );
        return data;
    }
}
