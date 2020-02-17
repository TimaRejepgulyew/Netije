import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';


function createCustomStore(options) {
    console.log("I signin in field load");
};

const store = new CustomStore({
    key: 'id',
    load: (loadOptions) => {
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
        return AxiosGet; 
    },
    insert: (values) => {
        // ...
    },
    update: (key, values) => {
        // ...
    },
    remove: (key) => {
        // ...
    }
});

// ===== or inside the DataSource =====
const dataSource = new DataSource({
    // ...
    // a mix of CustomStore and DataSource options
    // ...
});

export default {

    method:{
        AxiosGet(){
            this.$axios.$get(loadUrl);
        }
    },

    data() {
        return {
            createCustomStore,
            store,
            // ===== or =====
            // dataSource
        }
    }
}