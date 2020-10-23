import somePic1 from "~/static/icons/text.png";
import somePic2 from "~/static/icons/user-panel--icon.png";
import document from "~/static/icons/scanner/document.png"
const currentDevice = JSON.parse(localStorage.getItem("currentDevice"))
const deviceParamsByCurrentDevice = JSON.parse(localStorage.getItem(`deviceParamsBy/${currentDevice?.id}`))
const writeParamsByCurrentDevice = (params, currentDeviceId) => {
    JSON.stringify(params)
    localStorage.setItem(`deviceParamsBy/${currentDeviceId}`, JSON.stringify(params))
}
function sortFiles(files) {
    return files.sort(function (prevEl, currentEl) {
        if (prevEl.order > currentEl.oder) {
            return 1;
        }
        if (prevEl.order < currentEl.order) {
            return -1;
        }
        return 0;
    });
}
export const state = () => ({
    isLoading: false,
    file: null,
    currentDevice,
    devices: [
        //{
        //     id: 0, name: "Cannon",
        //     mode: [
        //         "scanner.coloured",
        //         "blackWhite",
        //     ],
        //     dpi: ["1280x 870x", "800x 640x", "1600x 1100x"]
        // },
        // {
        //     id: 1, name: "Hp 2020vf",
        //     mode: [
        //         "scanner.coloured",
        //         "blackWhite",
        //     ],
        //     dpi: ["1280x 870x", "800x 640x", "1600x 1100x"]
        // }, {
        //     id: 2, name: "Samsung",
        //     mode: [
        //         "scanner.coloured",
        //         "blackWhite",
        //     ],
        //     dpi: ["1280x 870x", "800x 640x", "1600x 1100x"]
        // }
    ],
    files: [
        // { id: 0, file: somePic1, rotate: 0, order: 1, },
        // { id: 1, file: somePic2, rotate: 0, order: 2, },
        // { id: 2, file: document, rotate: 0, order: 3, },
        // { id: 3, file: somePic2, rotate: 0, order: 4, },
    ],
    currentPageId: 0,
    params: deviceParamsByCurrentDevice || {
        mode: null,
        id: null,
        dpi: null,
        size: null
    },

})

export const getters = {
    isLoading({ isLoading }) {
        return isLoading
    },
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
    TOGGLE_LOADING(state,) {
        state.isLoading = !state.isLoading;
    },
    DELETE_FILES(state) {
        state.files = []
    },
    SET_FILE(state, payload) {
        state.file = payload
    },
    SET_DEVICE(state, payload) {

        state.params.id = payload
        writeParamsByCurrentDevice(state.params, state.params.id)
    },
    SET_SIZE(state, payload) {
        state.params.size = payload
        writeParamsByCurrentDevice(state.params, state.params.id)
    },
    SET_MODE(state, payload) {
        state.params.mode = payload
        writeParamsByCurrentDevice(state.params, state.params.id)
    },
    SET_DPI(state, payload) {
        state.params.dpi = payload
        writeParamsByCurrentDevice(state.params, state.params.id)
    },
    DELETE_PAGE(state) {
        state.files = state.files.filter(file => file.id !== state.currentPageId)
    },
    SET_PAGE(state, payload) {
        payload.rotate = 0
        payload.order = state.files.length + 1
        state.files.push(payload)

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
    SET_DEVICES(state, payload) {
        state.devices = payload
    },
    SET_PARAMS(state, payload) {
        state.params = payload
        writeParamsByCurrentDevice(state.params, state.params.id)
    },
    SET_CURRENT_DEVICE(state, payload) {
        state.currentDevice = payload
        localStorage.setItem("currentDevice", JSON.stringify(state.currentDevice))
    },
    SET_ORDER(state, payload) {
        let newOrder
        let files = state.files.map((page) => {
            if (page.id === state.currentPageId) {
                if (payload === "up") page.order -= 1
                else if (payload === "down") page.order += 1
                newOrder = page.order
            }

            return page
        })
        files = files.map((page) => {
            if (payload == "up") {

                if (page.id !== state.currentPageId && page.order === newOrder) {
                    page.order++
                }
            }
            else if (payload == "down") {
                if (page.id !== state.currentPageId && page.order === newOrder) {
                    page.order--
                }
            }

            return page
        })
        state.files = sortFiles(files)
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
    },

    setDevices({ commit }, payload) {
        commit("SET_DEVICES", payload)
    },
    setOrderUp({ commit },) {
        commit("SET_ORDER", "up")
    },
    setOrderDown({ commit },) {
        commit("SET_ORDER", "down")
    }
}

