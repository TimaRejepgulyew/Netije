import OutgoingLetter from "~/infrastructure/models/document-store/OutgoingLetter.js"
const store = new OutgoingLetter()
const state = () => (store.stateOptions())
const getters = { ...store.getterOptions() }
const actions = {
    ...store.actionOptions()
}
const mutations = { ...store.mutationOptions() }
export {
    state, getters, actions, mutations
}