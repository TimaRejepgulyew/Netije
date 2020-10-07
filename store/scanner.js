import somePic1 from "~/static/icons/text.png";
import somePic2 from "~/static/icons/user-panel--icon.png";
import document from "~/static/icons/scanner/document.png"
const currentDevice = JSON.parse(localStorage.getItem("currentDevice"))
const deviceParamsByCurrentDevice = JSON.parse(localStorage.getItem(`deviceParamsBy/${currentDevice?.id}`))
const writeParamsByCurrentDevice = (params, currentDeviceId) => {
    JSON.stringify(params)
    localStorage.setItem(`deviceParamsBy/${currentDeviceId}`, JSON.stringify(params))
}
export const state = () => ({
    file: null,
    currentDevice,
    devices: [{
        id: 0, name: "Cannon",
        mode: [
            { name: "scanner.coloured", id: 0 },
            { name: "blackWhite", id: 1 },
        ],
        dpi: ["1280x 870x", "800x 640x", "1600x 1100x"]
    },
    {
        id: 1, name: "Hp 2020vf",
        mode: [
            { name: "scanner.coloured", id: 1 },
            { name: "blackWhite", id: 1 },
            { name: "scanner.colo2121red", id: 3 },
        ],
        dpi: ["1280x 870x", "800x 640x", "1600x 1100x"]
    }, {
        id: 2, name: "Samsung",
        mode: [
            { name: "scanner.colo2121red", id: 2 },
            { name: "scanner.coloured", id: 0 },
            { name: "blackWhite", id: 1 },
        ],
        dpi: ["1280x 870x", "800x 640x", "1600x 1100x"]
    }
    ],
    files: [
        { id: 0, file: somePic1, rotate: 0 },
        { id: 1, file: somePic2, rotate: 0 },
        { id: 3, file: document, rotate: 0 },
        { id: 4, file: somePic2, rotate: 0 },],
    currentPageId: 0,
    params: deviceParamsByCurrentDevice || {
        mode: null,
        device: null,
        dpi: null
    },

})

export const getters = {
    isFilesEmpty({ files }) {
        return files.length === 0
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
    },
    currentDevice({ currentDevice }) {
        return currentDevice
    }
}
export const mutations = {

    DELETE_FILES(state) {
        state.files = []
    },
    SET_FILE(state, payload) {
        state.file = payload
    },
    SET_DEVICE(state, payload) {
        console.log(payload, "store device");
        state.params.device = payload
        writeParamsByCurrentDevice(state.params, state.params.device)
    },
    SET_MODE(state, payload) {
        state.params.mode = payload
        writeParamsByCurrentDevice(state.params, state.params.device)
    },
    SET_DPI(state, payload) {
        state.params.dpi = payload
        writeParamsByCurrentDevice(state.params, state.params.device)
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
        writeParamsByCurrentDevice(state.params, state.params.device)
    },
    SET_CURRENT_DEVICE(state, payload) {
        state.currentDevice = payload
        console.log(state.currentDevice, 'stiore');
        localStorage.setItem("currentDevice", JSON.stringify(state.currentDevice))
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
    },

    setDevice({ commit }, payload) {
        const defaultParams = JSON.parse(localStorage.getItem(`deviceParamsBy: ${payload}`))
        if (defaultParams) this.setParams(defaultParams)
        else commit("SET_DEVICE", payload.id)
        commit("SET_DEVICE_STORE", payload)
    },
}