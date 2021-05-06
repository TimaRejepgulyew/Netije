import dataApi from "~/static/dataApi";
import MessageType from "../constants/messageType";
export default class MessageService {
    static async getMessages(ctx, { take, skip, roomId }) {
        const {
            data
        } = await ctx.$axios.get(
            `${process.env.chatServerUrl}${dataApi.chat.Message}/${roomId}`,
            { params: { take, skip } }
        );
        ctx.$store.commit("chatStore/SET_MESSAGES", {
            roomId: data.data.roomId,
            messages: data.data.messages
        });
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
    static async postFiles(ctx, payload) {
        let formData = await new FormData();

        formData.append("roomId", payload.roomId);
        formData.append("type", MessageType.File);
        formData.append("text", "send file");
        for (const file of payload.files) {
            formData.append("attachments", file, file.name);
        }
        const { data } = await ctx.$axios.post(
            `${process.env.chatServerUrl}${dataApi.chat.File}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        return data;
    }
    static async sendFile(ctx, roomId, files) {
        let formData = new FormData();
        formData.append("attachments", files);
        formData.append("roomId", roomId);
        formData.append("text", "Files");
        formData.append("type", 1);
        return await ctx.$axios.post(
            `${process.env.chatServerUrl}${dataApi.chat.File}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );
    }
    static async downloadAttachment(ctx, attachment) {
        const {
            data
        } = await context.$axios.get(
            `${process.env.chatServerUrl}${dataApi.chat.DownloadFile}${attachment.id}`,
            { responseType: "blob" }
        );
        return data;
    }
}
