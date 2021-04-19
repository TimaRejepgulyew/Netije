import dataApi from "~/static/dataApi";
export default class RoomService {
  static async allRooms(ctx) {
    const { data } = await ctx.$axios.get(`${process.env.chatServerUrl}${dataApi.chat.Rooms}`)
    console.log(data);
    return data
  }
  static async createRoom(ctx, room) {
    const { data } = await ctx.$axios.post(`${process.env.chatServerUrl}${dataApi.chat.CreateRoom}`, room)
    console.log(data);
    return data
  }
}