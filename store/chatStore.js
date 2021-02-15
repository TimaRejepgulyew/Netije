
const obj = {
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        SOCKET_message(ctx, data) {
            console.log("Message from store", data);
        }
    }
}




export const state = () => (obj.state)
export const getters = obj.getters
export const actions = obj.actions
export const mutations = obj.mutations