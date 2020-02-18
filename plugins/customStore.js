import CustomStore from "devextreme/data/custom_store";

export default ({ $axios }, inject) => {

    function CreateStore(options) {
        function isNotEmpty(value) {
            return value !== undefined && value !== null && value !== '';
        }

        function loadToActionParams(loadOptions, isCountQuery) {
            let params = '?';
            [
                'skip',
                'take',
                'requireTotalCount',
                'requireGroupCount',
                'sort',
                'filter',
                'totalSummary',
                'group',
                'groupSummary'
            ].forEach(function (i) {
                if (i in loadOptions && isNotEmpty(loadOptions[i])) { params += `${i}=${JSON.stringify(loadOptions[i])}&`; }
            });
            params = params.slice(0, -1);
            return params;
        }

        function errorHandler(e) {
            console.log(e);
        }

        const store = new CustomStore({
            key: "id",
            errorHandler: errorHandler,
            load: async (loadOptions) => {
                var result = await $axios.get(options.loadUrl+ loadToActionParams(loadOptions));
                return result.data;
            },

            totalCount: async (loadOptions) => {
                var result = await $axios.get(options.loadUrl, loadToActionParams(loadOptions))
                return result.totalCount;
            },
            byKey: async (key) => {
                var result = await $axios.get(options.loadUrl)
                return result.data;
            },
            insert: async (values) => {
                let result = await $axios.post(options.insertUrl, values)
                return result.data
            },
            update: async (key, values) => {
                let result = await $axios.put(options.updateUrl + '/' + key, values)
                return result.data
            },
            remove: async (key) => {
                return await $axios.delete(options.removeUrl + '/' + key)
            }
        });
        store._useDefaultSearch = true;
        return store;
    }

    inject("dxStore", CreateStore);
}