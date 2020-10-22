import OutgoingTaxInvoice from "~/infrastructure/models/document-store/OutgoingTaxInvoice.js"
const store = new OutgoingTaxInvoice()
const state = () => (store.stateOptions())
const getters = { ...store.getterOptions() }
const actions = {
    ...store.actionOptions()
}
const mutations = { ...store.mutationOptions() }
export {
    state, getters, actions, mutations
}