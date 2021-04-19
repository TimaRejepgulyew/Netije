import dataApi from "~/static/dataApi";
export default class MessageService {
    static async messages(ctx,payload){
      const {take,skip,} = payload
      const {data} = await  ctx.$axios(`${process.env.chatServerUrl}${dataApi.chat.Messages}${payload.roomId}`,{params:{take,skip}})
      return data
    }
}