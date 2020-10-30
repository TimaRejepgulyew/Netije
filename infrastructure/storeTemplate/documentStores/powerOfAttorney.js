import PowerOfAttorney from "~/infrastructure/models/document-store/PowerOfAttorney.js"
const store = new PowerOfAttorney()
const state = () => (store.stateOptions())
const getters = { ...store.getterOptions() }
const actions = {
    ...store.actionOptions()
}
const mutations = { ...store.mutationOptions() }
export {
    state, getters, actions, mutations
}