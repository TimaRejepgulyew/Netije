import dataApi from "~/static/dataApi";
export default class RoomService {
  static async allRooms(ctx) {
    const { data } = await ctx.$axios.get(`${process.env.chatServerUrl}${dataApi.chat.Room}`)
    console.log(data);
    return data
  }
  static async createPrivateRoom(ctx, room) {
    const { data } = await ctx.$axios.post(`${process.env.chatServerUrl}${dataApi.chat.CreatePrivateRoom}`, room)
    console.log(data);
    return data
  }
}