<template>
  <div id="form-demo">
    <div class="widget-container">
      <Header :headerTitle="headerTitle"></Header>
      <form @submit="handleSubmit">
         <mainFocForm :docType="1"></mainFocForm> 
        <DxForm
          :col-count="1"
          :form-data.sync="store"
          :read-only="false"
          :show-colon-after-label="true"
          :show-validation-summary="true"
          validation-group="incommingLetter"
        >
          <DxGroupItem :caption="$t('translations.fields.fromWhom')">
            <DxSimpleItem data-field="inNumber" editor-type="dxNumberBox">
              <DxLabel :text="$t('translations.fields.incomingDocumentNumber')" />
              <DxRequiredRule :message="$t('translations.fields.incomingDocumentNumberRequired')" />
            </DxSimpleItem>

            <DxSimpleItem
              data-field="correspondentId"
              :editor-options="counterPartOptions"
              editor-type="dxSelectBox"
            >
              <DxLabel :text="$t('translations.fields.counterPart')" />
              <DxRequiredRule :message="$t('translations.fields.counterPartRequired')" />
            </DxSimpleItem>

            <DxSimpleItem
              :visible="isCompany"
              data-field="contactId"
              :editor-options="contactOptions"
              editor-type="dxSelectBox"
            >
              <DxLabel :text="$t('translations.menu.contacts')" />
              <DxRequiredRule :message="$t('translations.fields.counterPartRequired')" />
            </DxSimpleItem>

            <DxSimpleItem data-field="dated" :editor-options="datedOptions" editor-type="dxDateBox">
              <DxLabel :text="$t('translations.fields.dated')" />
            </DxSimpleItem>
          </DxGroupItem>

          <DxGroupItem :caption="$t('translations.fields.whom')">
            <DxSimpleItem
              data-field="businessUnitId"
              :editor-options="businessUnitOptions"
              editor-type="dxSelectBox"
            >
              <DxLabel :text="$t('translations.fields.businessUnitId')" />
              <DxRequiredRule :message="$t('translations.fields.counterPartRequired')" />
            </DxSimpleItem>
            <DxSimpleItem
              data-field="departmentId"
              :editor-options="deparmentOptions"
              editor-type="dxSelectBox"
            >
              <DxLabel :text="$t('translations.fields.departmentId')" />
              <DxRequiredRule :message="$t('translations.fields.departmentIdRequired')" />
            </DxSimpleItem>

            <DxSimpleItem
              data-field="inResponseToId"
              :editor-options="inResponseToIdOptions"
              editor-type="dxSelectBox"
            >
              <DxLabel :text="$t('translations.fields.inResponseTold')" />
            </DxSimpleItem>
          </DxGroupItem>

          <DxGroupItem :caption="$t('translations.fields.caseFileId')">
            <DxSimpleItem
              data-field="caseFileId"
              :editor-options="caseFileOptions"
              editor-type="dxSelectBox"
            >
              <DxLabel :text="$t('translations.fields.caseFileId')" />
            </DxSimpleItem>

            <DxSimpleItem data-field="placedToCaseFileDate" editor-type="dxDateBox">
              <DxLabel :text="$t('translations.fields.placedToCaseFileDate')" />
            </DxSimpleItem>
          </DxGroupItem>
          <DxSimpleItem data-field="note" editor-type="dxTextArea">
            <DxLabel :text="$t('translations.fields.note')" />
          </DxSimpleItem>
          <DxGroupItem :col-count="12" :col-span="2">
            <DxButtonItem
              :col-span="11"
              :button-options="addButtonOptions"
              horizontal-alignment="right"
            />
            <DxButtonItem
              :col-span="1"
              :button-options="cancelButtonOptions"
              horizontal-alignment="right"
            />
          </DxGroupItem>
        </DxForm>
      </form>
    </div>
  </div>
</template>
<script>
import mainFocForm from "~/components/paper-work/main-doc-form/index";
import { DxTagBox } from "devextreme-vue/tag-box";
import "devextreme-vue/text-area";
import Header from "~/components/page/page__header";
import DataSource from "devextreme/data/data_source";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxButtonItem,
  DxLabel,
  DxRequiredRule,
  DxCompareRule,
  DxRangeRule,
  DxStringLengthRule,
  DxPatternRule,
  DxAsyncRule
} from "devextreme-vue/form";
import dataApi from "~/static/dataApi";
import notify from "devextreme/ui/notify";

export default {
  components: {
    mainFocForm,
    Header,
    DxGroupItem,
    DxSimpleItem,
    DxButtonItem,
    DxLabel,
    DxRequiredRule,
    DxCompareRule,
    DxPatternRule,
    DxRangeRule,
    DxForm,
    DxAsyncRule,
    notify
  },
  data() {
    return {
      address: dataApi.paperWork.IncommingLetter,
      isUpdating: false,
      headerTitle: this.$t("translations.headers.addDocumentKind"),
      store: {
        name: "",
        subject: "",
        documentKindId: null,
        counterpartySignatoryId: null,
        contactId: null,
        correspondentId: null,
        inResponseToId: null,
        inNumber: null,
        addresseeId: null,
        deliveryMethodId: null,
        caseFileId: null,
        placedToCaseFileDate: null,
        departmentId: null,
        note: null,
        dated: null
        // electronicDocumentVersionId: null
      },
      correspondentName: "",
      documentKindName: "",
      addButtonOptions: {
        width: 100,
        height: 50,
        text: this.$t("translations.links.add"),
        useSubmitBehavior: true,
        type: "success"
      },
      cancelButtonOptions: {
        onClick: this.backTo,
        width: 100,
        height: 50,
        text: this.$t("translations.links.cancel"),
        useSubmitBehavior: false
      },
      isCompany: false,
      isDefaultName: false
    };
  },
  methods: {
    backTo() {
      this.$router.push("/docFlow/document-kind");
    },
    notify(msgTxt, msgType) {
      notify(
        {
          message: msgTxt,
          position: {
            my: "center top",
            at: "center top"
          }
        },
        msgType,
        3000
      );
    },
    handleSubmit(e) {
      if (this.isUpdating) {
        const object = { id: parseInt(this.$route.params.id), ...this.store };
        this.$axios
          .put(this.address, object)
          .then(res => {
            this.backTo();
            this.notify(
              this.$t("translations.headers.updateDocKindSucces"),
              "success"
            );
          })
          .catch(e => {
            this.notify(
              this.$t("translations.headers.updateDocKindError"),
              "error"
            );
          });
      } else {
        this.$axios
          .post(this.address, this.store)
          .then(res => {
            this.backTo();
            this.notify(
              this.$t("translations.headers.addDoctKindSucces"),
              "success"
            );
          })
          .catch(e => {
            this.notify(
              this.$t("translations.headers.addDoctKindError"),
              "error"
            );
          });
      }

      e.preventDefault();
    }
  },
  computed: {
    defaultName() {
      let name = this.store.subject + " " + this.documentKindName;
      if (this.correspondentName) {
        name += " От " + this.correspondentName;
      }
      if (this.store.dated) {
        name += " Дата прихода " + this.store.dated;
      }

      return name;
    },
    documentKindOptions() {
      return {
        dataSource: new DataSource({
          store: this.$dxStore({
            key: "id",
            loadUrl: dataApi.docFlow.DocumentKind
          }),
          filter: ["documentTypeId", "=", 1]
        }),
        onSelectionChanged: e => {
          this.isDefaultName = e.selectedItem.generateDocumentName;
          this.documentKindName = e.selectedItem.name;
        },
        valueExpr: "id",
        displayExpr: "name"
      };
    },
    nameOptions() {
      return {
        disabled: this.isDefaultName,
        value: this.defaultName
      };
    },

    counterPartOptions() {
      return {
        dataSource: this.$dxStore({
          key: "id",
          loadUrl: dataApi.contragents.CounterPart
        }),
        onSelectionChanged: e => {
          this.isCompany = e.selectedItem.type == "Company";
        },
        valueExpr: "id",
        displayExpr: "name"
      };
    },
    contactOptions() {
      const companyId = this.store.correspondentId;
      return {
        dataSource: new DataSource({
          store: this.$dxStore({
            key: "id",
            loadUrl: dataApi.contragents.Contact
          }),
          filter: [["companyId", "=", companyId], "and", ["status", "=", 0]]
        }),
        valueExpr: "id",
        displayExpr: "name"
      };
    },
    businessUnitOptions() {
      return {
        dataSource: new DataSource({
          store: this.$dxStore({
            key: "id",
            loadUrl: dataApi.company.BusinessUnit
          }),
          filter: ["status", "=", 0]
        }),
        valueExpr: "id",
        displayExpr: "name"
      };
    },
    deparmentOptions() {
      let businessUnitId = this.store.businessUnitId;
      this.store.departmentId = null;
      return {
        dataSource: new DataSource({
          store: this.$dxStore({
            key: "id",
            loadUrl: dataApi.company.Department
          }),
          filter: [
            ["businessUnitId", "=", businessUnitId],
            "and",
            ["status", "=", 0]
          ]
        }),
        valueExpr: "id",
        displayExpr: "name"
      };
    },
    caseFileOptions() {
      return {
        dataSource: new DataSource({
          store: this.$dxStore({
            key: "id",
            loadUrl: dataApi.docFlow.CaseFile
          }),
          filter: ["status", "=", 0]
        }),
        valueExpr: "id",
        displayExpr: "title"
      };
    },
    inResponseToIdOptions() {
      return {
        dataSource: new DataSource({
          store: this.$dxStore({
            key: "id",
            loadUrl: dataApi.paperWork.OutgoingLetter
          }),
          paginate: true,
          pageSize: 5
        }),
        valueExpr: "id",
        displayExpr: "name"
      };
    },
    datedOptions(){
      return{
        onValueChanged: e => {
          this.$store.dispatch('paper-work/setDated',e.value)
          console.log(e);
        
        },
      }
    }
  }
};
</script>
<style>
form {
  margin: 10px;
}
</style>

