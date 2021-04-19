import dataApi from "~/static/dataApi";
export default class MessageService {
    static async getMessages(ctx, payload) {
        const { take, skip } = payload;
        console.log("logfrom message.service");
        console.log("ctx", ctx);
        console.log("payload", payload);
        console.log("url", ` ${process.env.chatServerUrl}${dataApi.chat.Message}/${payload.roomId}`);
        const {
            data
        } = await ctx.$axios.get(
            `${process.env.chatServerUrl}${dataApi.chat.Message}/${payload.roomId}`,
            { params: { take, skip } }
        );
        return data;
    }
    static async postMessages(ctx, payload) {
        const {
            data
        } = await ctx.$axios.post(
            `${process.env.chatServerUrl}${dataApi.chat.Message}`,
            payload
        );
        return data;
    }
}
