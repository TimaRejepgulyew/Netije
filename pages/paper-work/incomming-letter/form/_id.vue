<template>
  <div id="form-demo">
    <div class="widget-container">
      <Header :headerTitle="headerTitle"></Header>
      <form @submit="handleSubmit">
        <DxForm
          :col-count="1"
          :form-data.sync="store"
          :read-only="false"
          :show-colon-after-label="true"
          :show-validation-summary="true"
          validation-group="customerData"
        >
          <!-- <main-doc-form :isUpdating="isUpdating"></main-doc-form> -->
          <DxSimpleItem data-field="subject" data-type="string">
            <DxLabel :text="$t('translations.fields.subject')" />
          </DxSimpleItem>

          <DxGroupItem :caption="$t('translations.fields.fromWhom')">
            <DxSimpleItem data-field="inNumber" data-type="string">
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
              data-field="correspondentId"
              :editor-options="contactOptions"
              editor-type="dxSelectBox"
            >
              <DxLabel :text="$t('translations.menu.contacts')" />
              <DxRequiredRule :message="$t('translations.fields.counterPartRequired')" />
            </DxSimpleItem>

            <DxSimpleItem data-field="dated" editor-type="dxDateBox">
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
          </DxGroupItem>
        </DxForm>
      </form>
    </div>
  </div>
</template>
<script>
import "devextreme-vue/text-area";
import { DxTagBox } from "devextreme-vue/tag-box";
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

  async created() {
    // if (this.$route.params.id != "newDocKind") {
    //   this.isUpdating = true;
    //   this.address = `${dataApi.docFlow.DocumentKind}/${this.$route.params.id}`;
    //   this.store = await this.getDataById(this.address);
    // }
    // this.documentType = await this.getData(dataApi.docFlow.DocumentType);
    // this.availableActions = await this.getData(
    //   dataApi.docFlow.DocumentSendAction
    // );
  },

  data() {
    return {
      address: dataApi.docFlow.DocumentKind,
      isUpdating: false,
      headerTitle: this.$t("translations.headers.addDocumentKind"),
      store: {
        counterpartySignatoryId: null,
        contactId: null,
        correspondentId: null,
        inResponseToId: null,
        inNumber: null,
        addresseeId: null,
        deliveryMethodId: null,
        subject: null,
        caseFileId: null,
        placedToCaseFileDate: null,
        businessUnitId: null,
        departmentId: null
        // electronicDocumentVersionId: null
      },
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
      isCompany: false
    };
  },
  methods: {
    async getDataById(url) {
      const res = await this.$axios.get(url);
      res.data.availableActions = res.data.availableActions.map(element => {
        return (element = element.id);
      });
      return res.data;
    },
    async getData(url) {
      const res = await this.$axios.get(url);
      return res.data.data;
    },
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
    counterPartOptions() {
      return {
        dataSource: this.counterPartStores,
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
      this.$set(this.store, "departmentId", null);
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
    }
    // statusOptions() {
    //   return {
    //     dataSource: this.$store.getters["status/status"],
    //     valueExpr: "id",
    //     displayExpr: "status"
    //   };
    // },
    // numberingTypeOptions() {
    //   return {
    //     dataSource: [
    //       { id: 0, name: this.$t("translations.fields.numerable") },
    //       { id: 1, name: this.$t("translations.fields.registrable") },
    //       { id: 2, name: this.$t("translations.fields.notNumerable") }
    //     ],
    //     disabled: this.isUpdating,
    //     valueExpr: "id",
    //     displayExpr: "name"
    //   };
    // },
    // documentFlowOptions() {
    //   return {
    //     dataSource: [
    //       { id: 0, name: this.$t("translations.fields.incomingEnum") },
    //       { id: 1, name: this.$t("translations.fields.outcomingEnum") },
    //       { id: 2, name: this.$t("translations.fields.inner") }
    //       //   { id: 3, name: this.$t("translations.fields.contracts") }
    //     ],
    //     disabled: this.isUpdating,
    //     valueExpr: "id",
    //     displayExpr: "name"
    //   };
    // },
    // tagboxOptions() {
    //   return {
    //     dataSource: this.availableActions,
    //     valueExpr: "id",
    //     displayExpr: "name"
    //   };
    // },

    // // docTypeOptions() {
    // //   return {
    // //     dataSource: this.documentType.filter(element => {
    // //       return element.documentFlow == this.store.documentFlow;
    // //     }),
    // //     disabled: this.isUpdating,
    // //     valueExpr: "id",
    // //     displayExpr: "name"
    // //   };
    // // },
    // isNumerable() {
    //   if (this.store.numberingType != 0) {
    //     return false;
    //   } else {
    //     this.store.autoNumbering = false;
    //     return true;
    //   }
    // }
  }
};
</script>
<style>
form {
  margin: 10px;
}
</style>

