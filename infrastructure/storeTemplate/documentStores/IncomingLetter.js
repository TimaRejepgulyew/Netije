import IncomingLetter from "~/infrastructure/models/document-store/IncomingLetter.js"
const incommingLeterStore = new IncomingLetter()
const state = () => (incommingLeterStore.stateOptions())
const getters = { ...incommingLeterStore.getterOptions() }
const actions = {
    ...incommingLeterStore.actionOptions()
}
const mutations = { ...incommingLeterStore.mutationOptions() }
export {
    state, getters, actions, mutations
}
