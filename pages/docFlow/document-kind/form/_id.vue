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
          <DxGroupItem :col-count="1">
            <DxSimpleItem data-field="code" data-type="string">
              <DxLabel location="top" :text="$t('translations.fields.code')" />
              <DxPatternRule
                :ignore-empty-value="false"
                :pattern="codePattern"
                :message="$t('translations.fields.codeRule')"
              />
              <DxAsyncRule
                :ignore-empty-value="true"
                :message="$t('translations.fields.codeAlreadyExists')"
                :validation-callback="validateEntityExists"
              ></DxAsyncRule>
            </DxSimpleItem>

            <DxSimpleItem data-field="name">
              <DxLabel location="top" :text="$t('translations.fields.name')" />
              <DxRequiredRule :message="$t('translations.fields.nameRequired')" />
            </DxSimpleItem>

            <DxSimpleItem data-field="shortName">
              <DxLabel location="top" :text="$t('translations.fields.shortName')" />
              <DxRequiredRule :message="$t('translations.fields.shortNameRequired')" />
            </DxSimpleItem>

            <DxSimpleItem
              data-field="documentFlow"
              :editor-options="documentFlowOptions"
              editor-type="dxSelectBox"
            >
              <DxLabel location="top" :text="$t('translations.fields.documentFlow')" />
              <DxRequiredRule :message="$t('translations.fields.documentFlowRequired')" />
            </DxSimpleItem>

            <DxSimpleItem
              data-field="numberingType"
              :editor-options="numberingTypeOptions"
              editor-type="dxSelectBox"
            >
              <DxLabel location="top" :text="$t('translations.fields.numberingType')" />
              <DxRequiredRule :message="$t('translations.fields.numberingTypeRequired')" />
            </DxSimpleItem>

            <DxSimpleItem
              data-field="documentTypeId"
              :editor-options=" docTypeOptions"
              editor-type="dxSelectBox"
            >
              <DxLabel location="top" :text="$t('translations.menu.documentType')" />
              <DxRequiredRule :message="$t('translations.fields.documentTypeIdRequired')" />
            </DxSimpleItem>

            <DxSimpleItem
              :editor-options="tagboxOptions"
              editor-type="dxTagBox"
              data-field="availableActions"
            >
              <DxLabel location="top" :text="$t('translations.fields.availableActions')" />
            </DxSimpleItem>

            <DxSimpleItem data-field="generateDocumentName" editor-type="dxCheckBox">
              <DxLabel location="top" :text="$t('translations.fields.generateDocumentName')" />
            </DxSimpleItem>

            <DxSimpleItem data-field="isDefault" editor-type="dxCheckBox">
              <DxLabel location="top" :text="$t('translations.fields.isDefault')" />
            </DxSimpleItem>

            <DxSimpleItem v-if="isNumerable" data-field="autoNumbering" editor-type="dxCheckBox">
              <DxLabel location="top" :text="$t('translations.fields.autoNumbering')" />
            </DxSimpleItem>

            <DxSimpleItem
              data-field="note"
              :col-span="1"
              :editor-options="{height: 90}"
              editor-type="dxTextArea"
            >
              <DxLabel location="top" :text="$t('translations.fields.note')" />
            </DxSimpleItem>

            <DxSimpleItem
              data-field="status"
              :visible="isUpdating"
              :editor-options="statusOptions"
              editor-type="dxSelectBox"
            >
              <DxLabel location="top" :text="$t('translations.fields.status')" />
            </DxSimpleItem>
            <DxGroupItem :col-span="1" :col-count="12">
              <DxButtonItem
                :button-options="addButtonOptions"
                horizontal-alignment="left"
                :col-span="1"
              />
              <DxButtonItem
                :col-span="11"
                :button-options="cancelButtonOptions"
                horizontal-alignment="left"
              />
            </DxGroupItem>
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
  async asyncData({ app, params }) {
    if (params.id != "newDocKind") {
      let address = `${dataApi.docFlow.DocumentKind}/${params.id}`;
      let { data } = await app.$axios.get(address);
      return {
        store: data,
        address,
        isUpdating: true
      };
    } else {
      return {};
    }
  },
  async created() {
    this.documentType = await this.getData(dataApi.docFlow.DocumentType);
    this.availableActions = await this.getData(
      dataApi.docFlow.DocumentSendAction
    );
  },
  data() {
    return {
      address: dataApi.docFlow.DocumentKind,
      isUpdating: false,
      headerTitle: this.$t("translations.headers.addDocumentKind"),
      store: {
        status: 0,
        name: "",
        documentFlow: null,
        note: "",
        shortName: "",
        numberingType: null,
        generateDocumentName: false,
        autoNumbering: false,
        isDefault: false,
        documentTypeId: null,
        code: "",
        availableActions: []
      },
      documentType: [],
      availableActions: [],
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
      codePattern: this.$store.getters["globalProperties/whitespacePattern"]
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
      this.$router.go(-1);
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
    validateEntityExists(params) {
      var dataField = params.formItem.dataField;
      return this.$customValidator.DocumentKindtDataFieldValueNotExists(
        {
          id: this.store.id,
          [dataField]: params.value
        },
        dataField
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
    statusOptions() {
      return {
        dataSource: this.$store.getters["status/status"],
        valueExpr: "id",
        displayExpr: "status",
        showClearButton: true
      };
    },
    numberingTypeOptions() {
      return {
        dataSource: [
          { id: 1, name: this.$t("translations.fields.registrable") },
          { id: 2, name: this.$t("translations.fields.numerable") },
          { id: 3, name: this.$t("translations.fields.notNumerable") }
        ],
        disabled: this.isUpdating ? this.store.hasDependencies : false,
        valueExpr: "id",
        displayExpr: "name",
        showClearButton: true
      };
    },
    documentFlowOptions() {
      return {
        dataSource: [
          { id: 0, name: this.$t("translations.fields.incomingEnum") },
          { id: 1, name: this.$t("translations.fields.outcomingEnum") },
          { id: 2, name: this.$t("translations.fields.inner") }
        ],
        onValueChanged: e => {
          this.store.documentTypeId = null;
        },
        disabled: this.isUpdating ? this.store.hasDependencies : false,
        valueExpr: "id",
        displayExpr: "name",
        showClearButton: true
      };
    },
    tagboxOptions() {
      return {
        dataSource: this.availableActions,
        valueExpr: "id",
        displayExpr: "name",
        showClearButton: true
      };
    },

    docTypeOptions() {
      return {
        dataSource: this.documentType.filter(element => {
          return element.documentFlow == this.store.documentFlow;
        }),
        disabled: this.isUpdating ? this.store.hasDependencies : false,
        valueExpr: "id",
        displayExpr: "name",
        showClearButton: true
      };
    },
    isNumerable() {
      if (this.store.numberingType != 2) {
        return false;
      } else {
        this.store.autoNumbering = false;
        return true;
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

