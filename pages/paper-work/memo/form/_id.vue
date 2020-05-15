<template>
  <div id="form-demo">
    <div class="widget-container">
      <MainForm :headerTitle="headerTitle" :store="store" :docType="docType">
        <DxForm
          :form-data.sync="store"
          :read-only="readOnly"
          :show-colon-after-label="true"
          :show-validation-summary="false"
          :on-field-data-changed="modified"
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
import DocumentType from "~/infrastructure/constants/documentType";
import MainForm from "~/components/paper-work/main-doc-form/main";
import Header from "~/components/page/page__header";
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
  DxRequiredRule
} from "devextreme-vue/form";
export default {
  components: {
    MainForm,
    Header,
    DxForm,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule
  },
  async asyncData({ app, params }) {
    if (params.id != "add") {
      let store = await app.$axios.get(
        dataApi.paperWork.GetDocumentById + params.id
      );
      return {
        readOnly: store.data.readOnly,
        canUpdate: store.data.canUpdate,
        canRegister: store.data.canRegister,
        canDelete: store.data.canDelete,
        store: store.data.document,
        isUpdating: true
      };
    } else {
      return {};
    }
  },
  created() {
    this.$store.commit("currentDocument/SET_DOCUMENT_STATE", {
      readOnly: this.readOnly,
      canUpdate: this.canUpdate,
      canRegister: this.canRegister,
      canDelete: this.canDelete,
      isRegistered: this.store.registrationState === 0
    });
  },
  data() {
    return {
      readOnly: false,
      canUpdate: true,
      canRegister: false,
      isUpdating: false,
      canDelete: false,
      docType: DocumentType.Memo,
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
    modified() {
      this.$store.commit("currentDocument/DATA_CHANGED", true);
    }
  },
  computed: {
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

