import ContractStatement from "~/infrastructure/models/document-store/ContractStatement.js"
const store = new ContractStatement()
const state = () => (store.stateOptions())
const getters = { ...store.getterOptions() }
const actions = {
    ...store.actionOptions()
}
const mutations = { ...store.mutationOptions() }
export {
    state, getters, actions, mutations
}