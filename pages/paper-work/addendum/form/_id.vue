<template>
  <div id="form-demo">
    <div class="widget-container">
      <MainForm
        :isSaved="isSaved"
        @modified="modified"
        :headerTitle="headerTitle"
        :store="store"
        :docType="6"
      >
        <DxForm
          :col-count="1"
          :form-data.sync="store"
          :read-only="false"
          :show-colon-after-label="true"
          :show-validation-summary="true"
          validation-group="OfficialDocument"
        >
          <DxGroupItem>
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

              <DxSimpleItem
                data-field="leadingDocumentId"
                :editor-options="leadingDocumentOptions"
                editor-type="dxSelectBox"
              >
                <DxLabel location="top" :text="$t('translations.fields.leadingDocumentId')" />
                <DxRequiredRule :message="$t('translations.fields.leadingDocumentIdRequired')" />
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
      addressPost: dataApi.paperWork.AddendumPost,
      isUpdating: false,
      isSaved: false,
      headerTitle: this.$t("translations.headers.addendum"),
      store: {
        leadingDocumentId: null,
        name: "",
        subject: "",
        note: "",
        documentKindId: null,
        caseFileId: null,
        placedToCaseFileDate: null,
        businessUnitId: 0,
        departmentId: null
      },
      isCompany: false
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
    },
    leadingDocumentOptions() {
      return this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.paperWork.AllDocument
      });
    }
  }
};
</script>


