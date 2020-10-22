import Memo from "~/infrastructure/models/document-store/Memo.js"
const store = new Memo()
const state = () => (store.stateOptions())
const getters = { ...store.getterOptions() }
const actions = {
    ...store.actionOptions()
}
const mutations = { ...store.mutationOptions() }
export {
    state, getters, actions, mutations
}