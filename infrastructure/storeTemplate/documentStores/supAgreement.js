import SupAgreement from "~/infrastructure/models/document-store/SupAgreement.js"
const store = new SupAgreement()
const state = () => (store.stateOptions())
const getters = { ...store.getterOptions() }
const actions = {
    ...store.actionOptions()
}
const mutations = { ...store.mutationOptions() }
export {
    state, getters, actions, mutations
}