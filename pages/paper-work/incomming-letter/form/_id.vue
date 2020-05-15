<template>
  <div id="form-demo">
    <div class="widget-container">
      <MainForm :headerTitle="headerTitle" :docType="docType" :store="store">
        <DxForm
          :col-count="1"
          :form-data.sync="store"
          :read-only="readOnly"
          :show-colon-after-label="true"
          :show-validation-summary="false"
          :on-field-data-changed="modified"
          validation-group="OfficialDocument"
        >
          <DxGroupItem :col-count="2">
            <DxGroupItem :caption="$t('translations.fields.fromWhom')">
              <DxSimpleItem data-field="inNumber">
                <DxLabel location="top" :text="$t('translations.fields.regNumberDocument')" />
              </DxSimpleItem>

              <DxSimpleItem data-field="dated" editor-type="dxDateBox">
                <DxLabel location="top" :text="$t('translations.fields.dated')" />
              </DxSimpleItem>

              <DxSimpleItem
                data-field="correspondentId"
                :editor-options="counterPartOptions"
                editor-type="dxSelectBox"
              >
                <DxLabel location="top" :text="$t('translations.fields.counterPart')" />
                <DxRequiredRule :message="$t('translations.fields.counterPartRequired')" />
              </DxSimpleItem>

              <DxSimpleItem
                data-field="deliveryMethodId"
                :editor-options="deliveryMethodOptions"
                editor-type="dxSelectBox"
              >
                <DxLabel location="top" :text="$t('translations.fields.mailDeliveryMethod')" />
              </DxSimpleItem>

              <DxGroupItem :visible="isCompany">
                <DxSimpleItem
                  data-field="contactId"
                  :editor-options="contactOptions"
                  editor-type="dxSelectBox"
                >
                  <DxLabel location="top" :text="$t('translations.fields.contactId')" />
                </DxSimpleItem>

                <DxSimpleItem
                  data-field="counterpartySignatoryId"
                  :editor-options="contactOptions"
                  editor-type="dxSelectBox"
                >
                  <DxLabel location="top" :text="$t('translations.fields.signatory')" />
                </DxSimpleItem>
              </DxGroupItem>
            </DxGroupItem>

            <DxGroupItem :caption="$t('translations.fields.whom')">
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
                <DxLabel location="top" :text="$t('translations.fields.whom')" />
              </DxSimpleItem>

              <DxSimpleItem
                data-field="inResponseToId"
                :editor-options="inResponseToIdOptions"
                editor-type="dxSelectBox"
              >
                <DxLabel location="top" :text="$t('translations.fields.inResponseTold')" />
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
        canDelete:store.data.canDelete,
        store: store.data.document,
        isUpdating: true
      };
    } else {
      return {};
    }
  },
  created() {
    if (!this.isUpdating) {
      this.$store.dispatch("paper-work/setMainFormProperties", {
        correspondent: ""
      });
    }

    this.$store.commit("currentDocument/SET_DOCUMENT_STATE", {
      readOnly: this.readOnly,
      canUpdate: this.canUpdate,
      canRegister: this.canRegister,
      canDelete:this.canDelete,
      isRegistered: this.store.registrationState === 0
    });
  },
  data() {
    return {
      readOnly: false,
      canUpdate: true,
      canRegister: false,
      isUpdating: false,
      docType: DocumentType.IncommingDocument,
      headerTitle: this.$t("translations.headers.incommingLetter"),
      store: {
        subject: "",
        counterpartySignatoryId: null,
        contactId: null,
        correspondentId: null,
        dated: null,
        inResponseToId: null,
        inNumber: null,
        addresseeId: null,
        deliveryMethodId: null,
        note: null,
        caseFileId: null,
        placedToCaseFileDate: null,
        businessUnitId: null,
        departmentId: null,
        version: null
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
    counterPartOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.contragents.CounterPart
        }),
        onSelectionChanged: e => {
          this.isCompany = e.selectedItem.type != "Person";
          this.$store.dispatch("paper-work/setMainFormProperties", {
            correspondent: e.selectedItem.name
          });
        },
        onValueChanged: () => {
          this.store.contactId = null;
          this.store.counterpartySignatoryId = null;
        }
      };
    },
    deliveryMethodOptions() {
      return this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.docFlow.MailDeliveryMethod
      });
    },
    contactOptions() {
      const companyId = this.store.correspondentId;
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.contragents.Contact,
          filter: [["companyId", "=", companyId], "and", ["status", "=", 0]]
        })
      };
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
        onValueChanged: () => {
          this.store.addresseeId = null;
        }
      };
    },
    employeeOptions() {
      let departmentId = this.store.departmentId;
      return this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.company.Employee,
        filter: [["departmentId", "=", departmentId], "and", ["status", "=", 0]]
      });
    },
    inResponseToIdOptions() {
      return this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.paperWork.OutgoingLetter
      });
    }
  }
};
</script>
