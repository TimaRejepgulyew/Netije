import IncomingTaxInvoice from "~/infrastructure/models/document-store/IncomingTaxInvoice.js"
const store = new IncomingTaxInvoice()
const state = () => (store.stateOptions())
const getters = { ...store.getterOptions() }
const actions = {
    ...store.actionOptions()
}
const mutations = { ...store.mutationOptions() }
export {
    state, getters, actions, mutations
}