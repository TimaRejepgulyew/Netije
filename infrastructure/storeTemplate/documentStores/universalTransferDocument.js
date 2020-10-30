import UniversalTransferDocument from "~/infrastructure/models/document-store/UniversalTransferDocument.js"
const store = new UniversalTransferDocument()
const state = () => (store.stateOptions())
const getters = { ...store.getterOptions() }
const actions = {
    ...store.actionOptions()
}
const mutations = { ...store.mutationOptions() }
export {
    state, getters, actions, mutations
}