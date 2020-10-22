import IncomingInvoice from "~/infrastructure/models/document-store/IncomingInvoice.js"
const store = new IncomingInvoice()
const state = () => (store.stateOptions())
const getters = { ...store.getterOptions() }
const actions = {
    ...store.actionOptions()
}
const mutations = { ...store.mutationOptions() }
export {
    state, getters, actions, mutations
}