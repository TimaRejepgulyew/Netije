import IncomingLetter from "~/infrastructure/models/document-store/IncomingLetter.js"
const incommingLeterStore = new IncomingLetter()
export const state = () => (incommingLeterStore.stateOptions())
export const getters = { ...incommingLeterStore.getterOptions() }
export const actions = {
    ...incommingLeterStore.actionOptions()
}
export const mutations = { ...incommingLeterStore.mutationOptions() }
