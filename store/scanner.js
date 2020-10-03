import somePic1 from "~/static/icons/text.png";
import somePic2 from "~/static/icons/user-panel--icon.png";
import document from "~/static/icons/scanner/document.png"
const writeParamsLocalStorage = (params) => {
    JSON.stringify(params)
    localStorage.setItem("scanParams", JSON.stringify(params))
}
export const state = () => ({
    file: null,
    devices: [
        "Cannon", "Hp 2020vf", "Samsung"
    ],
    files: [{ id: 0, file: somePic1, rotate: 0 },
    { id: 1, file: somePic2, rotate: 0 },
    { id: 3, file: document, rotate: 0 },
    { id: 4, file: somePic2, rotate: 0 },],
    currentPageId: 0,
    params: JSON.parse(localStorage.getItem("scanParams")) || {}
})

export const getters = {
    isFilesEmpty({ files }) {
        return files.length = 0
    },
    devices({ devices }) {
        return devices
    },
    currentPage({ files, currentPageId }) {
        if (files)
            return files.find(page => page.id === currentPageId)
    },
    files({ files }) {
        return files
    },
    params({ params }) {
        return params
    },
    currentPageId({ currentPageId }) {
        return currentPageId
    }
}
export const mutations = {
    DELETE_FILES(state, payload) {
        state.files = null
    },
    SET_FILE(state, payload) {
        state.file = payload
    },
    SET_DEVICE(state, payload) {
        state.params.device = payload
        writeParamsLocalStorage(state.params)
    },
    SET_COLOR(state, payload) {
        state.params.color = payload
        writeParamsLocalStorage(state.params)
    },
    SET_EXTENCION(state, payload) {
        state.params.extencion = payload
        writeParamsLocalStorage(state.params)
    },
    DELETE_PAGE(state) {
        state.files = state.files.filter(file => file.id !== state.currentPageId)
    },
    SET_PAGE(state, payload) {
        payload.rotate = 0
        state.files.unshift(payload)

    },
    SET_CURRENT_PAGE_ID(state, payload) {
        state.currentPageId = payload
    },
    ROTATE_PAGE(state, payload) {
        state.files.map(page => {
            if (page.id === state.currentPageId) {
                let newRotate = page.rotate + payload

                if (newRotate < 0) {
                    newRotate = 270
                }
                else if (newRotate === 360)
                    newRotate = 0

                page.rotate = newRotate
            }

        })
    },
    SET_PARAMS(state, payload) {
        state.params = payload
    }
}
export const actions = {
    rotatePage({ commit }, payload) {
        commit("ROTATE_PAGE", payload)
    },
    setPage({ commit }, payload) {
        commit("SET_PAGE", payload)
        commit("SET_CURRENT_PAGE_ID", payload.id)
    },
    deletePage({ commit }, payload) {
        commit("DELETE_PAGE", payload)
        commit("SET_CURRENT_PAGE_ID", null)
    },
    saveFile({ state }) {
        const file = state.files.map(({ id, rotate }) => { id, rotate })
        this.$scanner.saveFile(file)
    },
    scanDocument({ state },) {
        this.$scanner.scanDocument(state.params)

    },
    setParams({ commit }, payload) {
        commit("SET_PARAMS", payload)
    },
    setFile({ commit }, payload) {
        commit("SET_FILE", payload)
    },
    onClose({ commit },) {
        commit("DELETE_FILES")
        this.$scanner.stopConnection()
        console.log("Closset");
    }
}