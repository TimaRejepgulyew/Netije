import Vue from "vue"
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'



// const socket = SocketIO("http://192.168.4.159:5000", {
//     path: "/socket",
//     transoprts: ["websocket"],
// })


// socket.on("connect", () => {
//     socket.on("message", (msg) => {
//         console.log(msg);
//     })
// })

export default function ({ app, store }) {
    setTimeout(() => {
        const server = "http://192.168.4.159:5000"
        const storePath = "chatStore/"

        const token = store.getters["oidc/oidcAccessToken"]
        const options = {
            path: "/socket",
            auth: {
                token: token
            }
        }
        Vue.use(
            new VueSocketIO({
                debug: false,
                connection: SocketIO(server, options),
                vuex: {
                    store,
                    actionPrefix: storePath + 'SOCKET_',
                    mutationPrefix: storePath + 'SOCKET_'
                },
            })
        )
    }, 0);
}
