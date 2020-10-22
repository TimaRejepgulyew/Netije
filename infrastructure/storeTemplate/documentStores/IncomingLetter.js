import IncomingLetter from "~/infrastructure/models/document-store/IncomingLetter.js"
const store = new IncomingLetter()
const state = () => (store.stateOptions())
const getters = { ...store.getterOptions() }
const actions = {
    ...store.actionOptions()
}
const mutations = { ...store.mutationOptions() }
export {
    state, getters, actions, mutations
}
