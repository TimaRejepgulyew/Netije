<template>
  <div id="form-demo">
    <div class="widget-container">
      <Header :headerTitle="headerTitle"></Header>
      <form action="your-action" @submit="handleSubmit">
        <DxForm
          :col-count="1"
          :form-data.sync="documentKind"
          :read-only="false"
          :show-colon-after-label="true"
          :show-validation-summary="true"
          validation-group="customerData"
        >
          <DxGroupItem :col-count="1">
            <DxSimpleItem data-field="code" data-type="string">
              <DxLabel :text="$t('translations.fields.code')" />
            </DxSimpleItem>

            <DxSimpleItem data-field="name">
              <DxLabel :text="$t('translations.fields.name')" />
              <DxRequiredRule :message="$t('translations.fields.nameRequired')" />
            </DxSimpleItem>

            <DxSimpleItem data-field="shortName">
              <DxLabel :text="$t('translations.fields.shortName')" />
              <DxRequiredRule :message="$t('translations.fields.shortNameRequired')" />
            </DxSimpleItem>

            <DxSimpleItem
              data-field="documentFlow"
              :editor-options="documentFlowOptions"
              editor-type="dxSelectBox"
            >
              <DxLabel :text="$t('translations.fields.documentFlow')" />
              <DxRequiredRule :message="$t('translations.fields.documentFlowRequired')" />
            </DxSimpleItem>

            <DxSimpleItem
              data-field="numberingType"
              :editor-options="numberingTypeOptions"
              editor-type="dxSelectBox"
            >
              <DxLabel :text="$t('translations.fields.numberingType')" />
              <DxRequiredRule :message="$t('translations.fields.numberingTypeRequired')" />
            </DxSimpleItem>

            <DxSimpleItem
              data-field="documentTypeId"
              :editor-options=" docTypeOptions"
              editor-type="dxSelectBox"
            >
              <DxLabel :text="$t('translations.menu.documentType')" />
              <DxRequiredRule :message="$t('translations.fields.documentTypeIdRequired')" />
            </DxSimpleItem>

            <DxSimpleItem data-field="generateDocumentName" editor-type="dxCheckBox">
              <DxLabel :text="$t('translations.fields.generateDocumentName')" />
            </DxSimpleItem>

            <DxSimpleItem data-field="isDefault" editor-type="dxCheckBox">
              <DxLabel :text="$t('translations.fields.isDefault')" />
            </DxSimpleItem>

            <DxSimpleItem v-if="isNumerable" data-field="autoNumbering" editor-type="dxCheckBox">
              <DxLabel :text="$t('translations.fields.autoNumbering')" />
            </DxSimpleItem>

            <DxSimpleItem
              data-field="status"
              :editor-options=" statusOptions"
              editor-type="dxSelectBox"
            >
              <DxLabel :text="$t('translations.fields.status')" />
            </DxSimpleItem>

            <DxSimpleItem
              :editor-options="tagboxOptions"
              editor-type="dxTagBox"
              data-field="availableActions"
            >
              <DxLabel :text="$t('translations.fields.availableActions')" />
            </DxSimpleItem>

            <DxSimpleItem
              data-field="note"
              :col-span="1"
              :editor-options="{height: 90}"
              editor-type="dxTextArea"
            >
              <DxLabel :text="$t('translations.fields.note')" />
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
  DxEmailRule,
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
    DxEmailRule,
    DxForm,
    DxAsyncRule,
    notify
  },
  async created() {
    const documentType = await this.$axios.get(dataApi.docFlow.DocumentType);
    this.documentType = documentType.data.data;
    const availableActions = await this.$axios.get(
      dataApi.docFlow.DocumentSendAction
    );
    this.availableActions = availableActions.data.data;
  },
  data() {
    return {
      headerTitle: this.$t("translations.headers.addDocumentKind"),
      documentKind: {
        status: 0,
        name: "",
        documentFlow: 0,
        note: "",
        shortName: "",
        numberingType: 1,
        generateDocumentName: false,
        autoNumbering: false,
        isDefault: false,
        documentTypeId: 0,
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
        onClick: this.backToEmployee,
        width: 100,
        height: 50,
        text: this.$t("translations.links.cancel"),
        useSubmitBehavior: false
      },
      statusOptions: {
        dataSource: this.$store.getters["status/status"],
        valueExpr: "id",
        displayExpr: "status"
      },
      documentFlowOptions: {
        dataSource: [
          { id: 0, name: this.$t("translations.fields.incomingEnum") },
          { id: 1, name: this.$t("translations.fields.outcomingEnum") },
          { id: 2, name: this.$t("translations.fields.inner") }
          //   { id: 3, name: this.$t("translations.fields.contracts") }
        ],
        valueExpr: "id",
        displayExpr: "name"
      },
      numberingTypeOptions: {
        dataSource: [
          { id: 0, name: this.$t("translations.fields.numerable") },
          { id: 1, name: this.$t("translations.fields.notNumerable") },
          { id: 2, name: this.$t("translations.fields.registrable") }
        ],
        valueExpr: "id",
        displayExpr: "name"
      }
    };
  },
  methods: {
    backTo() {
      this.$router.push("/docFlow/document-kind");
    },
    handleSubmit(e) {
      this.$axios
        .post(dataApi.docFlow.DocumentKind, this.documentKind)
        .then(res => {
          this.backTo();
          notify(
            {
              message: this.$t("translations.menu.addEmployeeSucces"),
              position: {
                my: "center top",
                at: "center top"
              }
            },
            "success",
            3000
          );
        })
        .catch(e => {
          notify(
            {
              message: this.$t("translations.menu.addEmployeeError"),
              position: {
                my: "center top",
                at: "center top"
              }
            },
            "error",
            3000
          );
        });

      e.preventDefault();
    }
  },
  computed: {
    tagboxOptions() {
      return {
        dataSource: this.availableActions,
        valueExpr: "id",
        displayExpr: "name"
      };
    },

    docTypeOptions() {
      return {
        dataSource: this.documentType.filter(element => {
          return element.documentFlow == this.documentKind.documentFlow;
        }),
        valueExpr: "id",
        displayExpr: "name"
      };
    },
    isNumerable() {
      if (this.documentKind.numberingType != 0) {
        return false;
      } else {
        this.documentKind.autoNumbering = false;
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

