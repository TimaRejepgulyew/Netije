

export const state = () => ({
    status:[
        { id: 0, status: "Активна" },
        { id: 1, status: "Закрыта" }
      ],

})

export const getters = {
    Status(state) {
        return state.status
    },

}