<template>
  <div id="form-demo">
    <div class="widget-container">
      <MainForm
        :isDataChanged="isDataChanged"
        @saved="saved"
        @modified="modified"
        :headerTitle="headerTitle"
        :store="store"
        :docType="7"
      >
        <DxForm
          :col-count="1"
          :form-data.sync="store"
          :read-only="!store.readOnly"
          :show-colon-after-label="true"
          :show-validation-summary="true"
          validation-group="OfficialDocument"
        >
          <DxGroupItem :col-count="2">
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
                data-field="addresseeId"
                :editor-options="employeeOptions"
                editor-type="dxSelectBox"
              >
                <DxLabel location="top" :text="$t('translations.fields.addresseeId')" />
                <DxRequiredRule :message="$t('translations.fields.addresseeIdRequired')" />
              </DxSimpleItem>
            </DxGroupItem>

            <DxGroupItem>
              <DxSimpleItem
                data-field="ourSignatoryId"
                :editor-options="employeeOptions"
                editor-type="dxSelectBox"
              >
                <DxLabel location="top" :text="$t('translations.fields.signatory')" />
                <DxRequiredRule :message="$t('translations.fields.signatoryRequired')" />
              </DxSimpleItem>
              <DxSimpleItem
                data-field="assigneeId"
                :editor-options="employeeOptions"
                editor-type="dxSelectBox"
              >
                <DxLabel location="top" :text="$t('translations.fields.assigneeId')" />
              </DxSimpleItem>

              <DxSimpleItem
                data-field="preparedById"
                :editor-options="preparedOptions"
                editor-type="dxSelectBox"
              >
                <DxLabel location="top" :text="$t('translations.fields.prepared')" />
                <DxRequiredRule :message="$t('translations.fields.preparedRequired')" />
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
      isDataChanged: false,
      headerTitle: this.$t("translations.headers.memo"),
      store: {
        ourSignatoryId: null,
        preparedById: null,
        addresseeId: null,
        assigneeId: null,
        name: "",
        subject: "",
        note: "",
        documentKindId: null,
        caseFileId: null,
        placedToCaseFileDate: null,
        businessUnitId: null,
        departmentId: null
      },
      isCompany: false
    };
  },
  methods: {
    saved() {
      this.isDataChanged = true;
    },
    modified() {
      if (this.isUpdating) {
        unwatch();
        console.log("watch is work ");
        this.isDataChanged = false;
      }
    },
    eventIsModified() {
      if (this.isUpdating) {
        this.isDataChanged = true;
        unwatch = this.$watch("store", this.modified, { deep: true });
      }
    }
  },
  computed: {
    hasPermission() {
      return this.$store.getters["paper-work/hasPermissions"];
    },
    preparedOptions() {
      const departmentId = this.store.departmentId;
      return this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.company.Employee,
        filter: [["departmentId", "=", departmentId], "and", ["status", "=", 0]]
      });
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
          this.store.ourSignatoryId = null;
          this.store.preparedById = null;
          this.store.addresseeId = null;
          this.store.assigneeId = null;
        }
      };
    },
    deparmentOptions() {
      let businessUnitId = this.store.businessUnitId;
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Department,
          filter: [
            ["businessUnitId", "=", businessUnitId],
            "and",
            ["status", "=", 0]
          ]
        }),
        onValueChanged: e => {
          this.store.addresseeId = null;
        }
      };
    },
    employeeOptions() {
      let businessUnitId = this.store.businessUnitId;
      return this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.company.Employee,
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

