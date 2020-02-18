import CustomStore from "devextreme/data/custom_store";

export default ({ $axios }, inject) => {

    function CreateStore(options) {
        function isNotEmpty(value) {
            return value !== undefined && value !== null && value !== '';
        }
        const store = new CustomStore({
            key: options.key,
            load: async (loadOptions) => {
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
                 var result = await $axios.get(options.loadUrl)
                 return result.data;
            },
            byKey: async(key)=>{
                var result = await $axios.get(options.loadUrl+"/"+key)
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