<template>
  <div id="form-demo">
    <div class="widget-container">
      <MainForm
        :isSaved="isSaved"
        @modified="modified"
        :headerTitle="headerTitle"
        :store="store"
        :docType="5"
      >
        <DxForm
          :col-count="1"
          :form-data.sync="store"
          :read-only="!hasPermission"
          :show-colon-after-label="true"
          :show-validation-summary="true"
          validation-group="OfficialDocument"
        >
          <DxGroupItem :col-count="1">
            <DxGroupItem>
              <DxSimpleItem
                data-field="businessUnitId"
                :editor-options="businessUnitOptions"
                editor-type="dxSelectBox"
              >
                <DxLabel location="top" :text="$t('translations.fields.businessUnitId')" />
                <DxRequiredRule :message="$t('translations.fields.businessUnitIdRequired')" />
              </DxSimpleItem>
              <DxSimpleItem
                data-field="departmentId"
                :editor-options="deparmentOptions"
                editor-type="dxSelectBox"
              >
                <DxLabel location="top" :text="$t('translations.fields.departmentId')" />
                <DxRequiredRule :message="$t('translations.fields.departmentIdRequired')" />
              </DxSimpleItem>
            </DxGroupItem>
          </DxGroupItem>
        </DxForm>
      </MainForm>
    </div>
  </div>
</template>
<script>
import MainForm from "~/components/paper-work/main-doc-form/main";
import Header from "~/components/page/page__header";
import DataSource from "devextreme/data/data_source";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
  DxRequiredRule,
  DxPatternRule,
  DxAsyncRule
} from "devextreme-vue/form";
import dataApi from "~/static/dataApi";
import notify from "devextreme/ui/notify";
let unwatch;
export default {
  components: {
    MainForm,
    Header,
    DxForm,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule,
    DxPatternRule,
    DxAsyncRule
  },
  created() {
    this.eventIsModified();
  },
  async asyncData({ app, params }) {
    if (params.id != "add") {
      let store = await app.$axios.get(
        dataApi.paperWork.GetDocumentById + params.id
      );
      return {
        store: store.data.document,
        isUpdating: true
      };
    } else {
      return {};
    }
  },
  data() {
    return {
      isUpdating: false,
      isSaved: false,
      headerTitle: this.$t("translations.headers.simpleDocument"),
      store: {
        name: "",
        subject: "",
        note: "",
        documentKindId: null,
        caseFileId: null,
        placedToCaseFileDate: null,
        businessUnitId: null,
        departmentId: null
      }
    };
  },
  methods: {
    modified() {
      if (this.isUpdating) {
        unwatch();
        console.log("watch is work ");
        this.isSaved = false;
      }
    },
    eventIsModified() {
      if (this.isUpdating) {
        this.isSaved = true;
        unwatch = this.$watch("store", this.modified, { deep: true });
      }
    }
  },
  computed: {
    hasPermission() {
      return this.$store.getters["paper-work/hasPermissions"];
    },
    businessUnitOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.BusinessUnit,
          filter: ["status", "=", 0]
        }),
        onValueChanged: e => {
          this.store.departmentId = null;
        }
      };
    },
    deparmentOptions() {
      let businessUnitId = this.store.businessUnitId;
      return this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.company.Department,
        filter: [
          ["businessUnitId", "=", businessUnitId],
          "and",
          ["status", "=", 0]
        ]
      });
    }
  }
};
</script>

