<template>
  <DxForm
    :col-count="1"
    :form-data.sync="store"
    :read-only="false"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    validation-group="incommingLetter"
  >
    <DxGroupItem :caption="$t('translations.fields.main')">
      <DxSimpleItem v-if="isDefaultName" :editor-options="nameOptions">
        <DxLabel :text="$t('translations.fields.name')" />
        <DxRequiredRule :message="$t('translations.fields.nameRequired')" />
      </DxSimpleItem>

      <DxSimpleItem v-else data-field="name">
        <DxLabel :text="$t('translations.fields.name')" />
        <DxRequiredRule :message="$t('translations.fields.nameRequired')" />
      </DxSimpleItem>

      <DxSimpleItem data-field="subject" :editor-options="subjectOptions" editor-type="dxTextArea">
        <DxLabel :text="$t('translations.fields.subject')" />
         <DxRequiredRule :message="$t('translations.fields.subjectRequired')" />
      </DxSimpleItem>

      <DxSimpleItem
        data-field="documentKindId"
        :editor-options="documentKindOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel :text="$t('translations.fields.documentKindId')" />
        <DxRequiredRule :message="$t('translations.fields.documentKindIdRequired')" />
      </DxSimpleItem>
    </DxGroupItem>
  </DxForm>
</template>
<script>
import "devextreme-vue/text-area";
import { DxTagBox } from "devextreme-vue/tag-box";
import DataSource from "devextreme/data/data_source";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
  DxRequiredRule,
  DxRangeRule,
  DxAsyncRule
} from "devextreme-vue/form";
import dataApi from "~/static/dataApi";

export default {
  components: {
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule,
    DxRangeRule,
    DxForm,
    DxAsyncRule
  },
  props: ["docType"],
  data() {
    return {
      isUpdating: false,
      store: {
        name: "",
        subject: "",
        documentKindId: null
      },
      docKindName: "",
      isDefaultName: false
    };
  },
  methods: {
    // async getDataById(url) {
    //   const res = await this.$axios.get(url);
    //   res.data.availableActions = res.data.availableActions.map(element => {
    //     return (element = element.id);
    //   });
    //   return res.data;
    // },
    // async getData(url) {
    //   const res = await this.$axios.get(url);
    //   return res.data.data;
    // },
  },
  computed: {
    defaultName() {
      return this.$store.getters["paper-work/defaultName"](this.docType);
      //   return `${this.docKindName} ${this.store.subject} ${this.$store.getters['paper-work/dated']}`;
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
          if (this.isDefaultName) {
            this.$store.dispatch(
              "paper-work/setDocKindName",
              e.selectedItem.shortName
            );

            // console.log(e.selectedItem);
          }
        },
        valueExpr: "id",
        displayExpr: "name"
      };
    },
    nameOptions() {
      return {
        value: this.defaultName,
        disabled: this.isDefaultName
      };
    },
    subjectOptions() {
      return {
        onValueChanged: e => {
          this.$store.dispatch("paper-work/setSubject", e.value);
          console.log(e);
        }
      };
    }
  }
};
</script>
<style>
form {
  margin: 10px;
}
</style>
