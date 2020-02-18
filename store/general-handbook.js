

export const state = () => ({
    countryStatus:[
        { id: 0, status: "Активна" },
        { id: 1, status: "Закрыта" }
      ],

})

export const getters = {
    countryStatus(state) {
        return state.countryStatus
    },

}