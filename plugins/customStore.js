import CustomStore from "devextreme/data/custom_store";

export default ({ $axios }, inject) => {

    function CreateStore(options) {
        function isNotEmpty(value) {
            return value !== undefined && value !== null && value !== '';
        }
        const store = new CustomStore({
            key: "id",
            load: async (loadOptions) => {
                loadOptions.requireTotalCount = false;
                let params = '?';
                [
                    'skip',
                    'take',
                    'requireTotalCount',
                    'requireGroupCount',
                ].forEach(function (i) {
                    if (i in loadOptions && isNotEmpty(loadOptions[i])) { params += `${i}=${JSON.stringify(loadOptions[i])}&`; }
                });
                params = params.slice(0, -1);

                var result = await $axios.get(options.loadUrl + params);
                return result.data;
            },

            totalCount: async () => {
                // let params = '?';
                // [
                //     'skip',
                //     'take',
                //     'requireTotalCount',
                //     'requireGroupCount',
                // ].forEach(function (i) {
                //     if (i in loadOptions && isNotEmpty(loadOptions[i])) { params += `${i}=${loadOptions[i]}&`; }
                // });
                // params = params.slice(0, -1);

                return await $axios.get(options.loadUrl)
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
                return await $axios.delete(options.removetUrl + '/' + key)
            }
        });

        return store;
    }

    inject("dxStore", CreateStore);
}