import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';


function createStore(options) {
    var store = new CustomStore(actions.CreateStore(options));
    store._useDefaultSearch = true;
    return store;
}

export const actions = {
    CreateStore({ commit }, payload) {
        debugger
        var keyExpr = options.key,
            loadUrl = options.loadUrl,
            loadMethod = options.loadMethod || "GET",
            loadParams = options.loadParams,
            updateUrl = options.updateUrl,
            insertUrl = options.insertUrl,
            deleteUrl = options.deleteUrl;

        function send(operation, requiresKey, axios) {

        }
        return {
            key: keyExpr,

            load: function (loadOptions) {
                return send(
                    "load",
                    false,
                    this.$axios.$get(loadUrl),
                    function (d, res) {
                        debugger
                        processLoadResponse(d, res, function (res) {
                            return [res.data, createLoadExtra(res)];
                        });
                    }
                );
            },
        }

    },

}

// const store = new CustomStore({
//     key: 'id',
//     load: (loadOptions) => {
//         debugger
//         let params = '?';
//         [
//             'skip',
//             'take',
//             'requireTotalCount',
//             'requireGroupCount',
//             'sort',
//             'filter',
//             'totalSummary',
//             'group',
//             'groupSummary'
//         ].forEach(function (i) {
//             if (i in loadOptions && isNotEmpty(loadOptions[i])) { params += `${i}=${JSON.stringify(loadOptions[i])}&`; }
//         });
//         params = params.slice(0, -1);
//         return this.$axios.$get(payload.loadUrl);
//     },
//     insert: (values) => {
//         dispatch(CreateEmployee, { insertUrl: payload.insertUrl, values });
//     },
//     update: (key, values) => {
//         // ...
//     },
//     remove: (key) => {
//         // ...
//     }
// }),


// export default {

//     method: {

//     }

//     data() {
//         return {
//             store,
//             // ===== or =====
//             // dataSource
//         }
//     }
// }