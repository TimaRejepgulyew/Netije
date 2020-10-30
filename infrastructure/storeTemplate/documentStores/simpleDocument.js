import SimpleDocument from "~/infrastructure/models/document-store/SimpleDocument.js"
const store = new SimpleDocument()
const state = () => (store.stateOptions())
const getters = { ...store.getterOptions() }
const actions = {
    ...store.actionOptions()
}
const mutations = { ...store.mutationOptions() }
export {
    state, getters, actions, mutations
}