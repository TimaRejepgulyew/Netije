<template>
  <DxForm
    :col-count="1"
    :form-data.sync="store"
    :read-only="false"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    validation-group="incommingLetter"
  >
    <DxGroupItem :col-count="2" :caption="$t('translations.fields.main')">
      <DxSimpleItem data-field="name" :editor-options="nameOptions">
        <DxLabel :text="$t('translations.fields.nameRequired')" />
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
let unwatch;
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
  async created() {
    this.getDefaultDocKind();
  },
  props: ["docType", "properties"],
  data(context) {
    let { name, subject, documentKindId } = context.properties;
    this.$store.dispatch("paper-work/setSubject", subject);
    this.$store.dispatch("paper-work/setName", name);
    this.$store.dispatch("paper-work/setDocumentKind", documentKindId);
    return {
      isUpdating: false,
      store: {
        name,
        subject: subject || "",
        documentKindId
      },
      defaultDocKind: null,
      docKindName: "",
      isDefaultName: false,
      isSaved: false
    };
  },
  methods: {
    async getDataById(address) {
      const res = await this.$axios.get(address);
      return res.data.document;
    },
    async getDefaultDocKind() {
      let docKindStores = await this.getData(
        dataApi.docFlow.DocumentKind +
          `?skip=0&take=20&filter=[["documentTypeId","=",${this.docType}],"and",["status","=",0]]`
      );
      if (docKindStores.length < 2) {
        this.defaultDocKind = docKindStores[0].id;
      } else {
        this.defaultDocKind = docKindStores.find(el => {
          el.isDefault
            ? this.$store.dispatch("paper-work/setDocumentKind", el)
            : false;

          return el.isDefault;
        }).id;
      }
    },
    async getData(url) {
      const res = await this.$axios.get(url);
      return res.data.data;
    },
    test() {
      if (this.$route.params.id != "add") {
        this.$emit("eventWatch");
      }
    }
  },
  computed: {
    defaultName() {
      return this.$store.getters["paper-work/defaultName"](this.docType);
    },
    documentKindOptions() {
      return {
        dataSource: new DataSource({
          store: this.$dxStore({
            key: "id",
            loadUrl: dataApi.docFlow.DocumentKind
          }),
          filter: [["documentTypeId", "=", 1], "and", ["status", "=", 0]]
        }),
        value: this.defaultDocKind,
        // ? this.defaultDocKind
        // : this.store.defaultDocKindId,
        onSelectionChanged: e => {
          if (e.selectedItem) {
            this.isDefaultName = e.selectedItem.generateDocumentName;
            this.$store.dispatch("paper-work/setDocumentKind", e.selectedItem);
          } else {
            this.isDefaultName = false;
            this.$store.dispatch("paper-work/setDocumentKind", "");
          }
        },
        onValueChanged: () => {
          this.test();
        },
        showClearButton: "true",
        valueExpr: "id",
        displayExpr: "name"
      };
    },
    nameOptions() {
      return {
        value: this.isDefaultName ? this.defaultName : this.store.name,
        disabled: this.isDefaultName,
        onValueChanged: e => {
          this.$store.dispatch("paper-work/setName", e.value);
          this.test();
        }
      };
    },
    subjectOptions() {
      return {
        onValueChanged: e => {
          this.$store.dispatch("paper-work/setSubject", e.value);
          this.test();
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
