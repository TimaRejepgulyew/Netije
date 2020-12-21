import dataApi from "~/static/dataApi";
import MasterDetailContacts from "~/components/parties/organizations/master-detail-contacts";
import Header from "~/components/page/page__header";
import textArea from "~/components/page/textArea";
import {
  DxPatternRule,
  DxSearchPanel,
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxHeaderFilter,
  DxScrolling,
  DxLookup,
  DxGrouping,
  DxGroupPanel,
  DxAsyncRule,
  DxRequiredRule,
  DxExport,
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxStateStoring,
  DxMasterDetail,
  DxEmailRule,
  DxButton
} from "devextreme-vue/data-grid";

export default {
  components: {
    MasterDetailContacts,
    textArea,
    Header,
    DxSearchPanel,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxHeaderFilter,
    DxScrolling,
    DxLookup,
    DxGrouping,
    DxGroupPanel,
    DxRequiredRule,
    DxPatternRule,
    DxAsyncRule,
    DxExport,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring,
    DxMasterDetail,
    DxEmailRule,
    DxButton
  },
  data() {
    return {
      statusDataSource: this.$store.getters["status/status"](this),
      selectDocument: e => {
        this.toDetail(e.key);
      },
      codePattern: this.$store.getters["globalProperties/whitespacePattern"],
      localityStore: {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.sharedDirectory.Locality
        }),
        paginate: true
      },
      regionStore: {
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.sharedDirectory.Region
        }),
        paginate: true
      }
    };
  },
  methods: {
    allowDeleting(e) {
      return (
        this.$store.getters["permissions/allowDeleting"](this.entityType) &&
        !e.row.data.isCardReadOnly
      );
    },

    onToolbarPreparing(e) {
      e.toolbarOptions.items.unshift({
        widget: "button",
        location: "after",
        options: {
          icon: "refresh",
          onClick: () => {
            this.dataSource.reload();
          }
        }
      });
      e.toolbarOptions.items.unshift({
        widget: "button",
        location: "after",
        options: {
          icon: "plus",
          visible: this.$store.getters["permissions/allowCreating"](
            this.entityType
          ),
          onClick: this.createCounterPart
        }
      });
    }
  }
};
