<template>
  <DxForm
    :col-count="1"
    :form-data.sync="store"
    :read-only="readOnly"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    :on-field-data-changed="modified"
    validation-group="OfficialDocument"
  >
    <DxGroupItem :col-count="1" :caption="$t('translations.fields.main')">
      <DxSimpleItem data-field="name" :editor-options="nameOptions">
        <DxLabel location="top" :text="$t('translations.fields.nameRequired')" />
        <DxRequiredRule :message="$t('translations.fields.nameRequired')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="documentKindId"
        :editor-options="documentKindOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel location="top" :text="$t('translations.fields.documentKindId')" />
        <DxRequiredRule :message="$t('translations.fields.documentKindIdRequired')" />
      </DxSimpleItem>

      <DxSimpleItem data-field="subject" :editor-options="subjectOptions" editor-type="dxTextArea">
        <DxLabel location="top" :text="$t('translations.fields.subject')" />
        <DxRequiredRule :message="$t('translations.fields.subjectRequired')" />
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
    if (this.$route.params.id == "add") {
      this.getDefaultDocKind();
    }
  },
  props: ["docType", "properties"],
  data(context) {
    let {
      name,
      subject,
      documentKindId,
      note,
      placedToCaseFileDate,
      caseFileId,
      documentRegisterId,
      registrationDate,
      registrationNumber
    } = context.properties;

    this.$store.dispatch("paper-work/setMainFormProperties", {
      subject,
      name
    });
    return {
      store: {
        name,
        subject,
        documentKindId
      },
      defaultDocKind: null,
      docKindName: "",
      isDefaultName: false
    };
  },
  methods: {
    async getDefaultDocKind() {
      let docKindStores = await this.getData(
        dataApi.docFlow.DocumentKind +
          `?skip=0&take=20&filter=[["documentTypeId","=",${this.docType}],"and",["status","=",0]]`
      );

      if (docKindStores.length == 1) {
        this.store.documentKindId = docKindStores[0].id;
        this.$store.dispatch("paper-work/setMainFormProperties", {
          documentKind: docKindStores[0]
        });
      } else {
        this.store.documentKindId = docKindStores.find(el => {
          el.isDefault
            ? this.$store.dispatch("paper-work/setMainFormProperties", {
                documentKind: el
              })
            : false;
          return el.isDefault;
        }).id;
      }
    },
    async getData(url) {
      const res = await this.$axios.get(url);
      return res.data.data;
    },
    modified(e) {
      this.$store.commit("currentDocument/DATA_CHANGED", true);
    }
  },
  computed: {
    isDataChanged() {
      return this.$store.getters["currentDocument/isDataChanged"];
    },
    readOnly() {
      return this.$store.getters["currentDocument/readOnly"];
    },
    defaultName() {
      if (this.isDefaultName) {
        return this.$store.getters["paper-work/defaultName"](
          this.docType,
          this
        );
      } else {
        return this.name;
      }
    },
    documentKindOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.docFlow.DocumentKind,
          filter: [
            ["documentTypeId", "=", this.docType],
            "and",
            ["status", "=", 0]
          ]
        }),

        onSelectionChanged: e => {
          if (e.selectedItem) {
            this.isDefaultName = e.selectedItem.generateDocumentName;
            this.$store.dispatch("paper-work/setMainFormProperties", {
              documentKind: e.selectedItem
            });
          } else {
            this.$store.dispatch("paper-work/setMainFormProperties", {
              documentKind: { shortName: "" }
            });
            this.isDefaultName = false;
          }
        }
      };
    },
    nameOptions() {
      const options = {
        disabled: this.isDefaultName,
        onValueChanged: e => {
          this.$store.dispatch("paper-work/setMainFormProperties", {
            name: e.value
          });
        }
      };
      if (this.isDataChanged) {
        options.value = this.defaultName;
        options.onValueChanged = e => {
          this.$store.dispatch("paper-work/setMainFormProperties", {
            name: e.value
          });
        };
      }

      return options;
    },
    subjectOptions() {
      return {
        onValueChanged: e => {
          this.$store.dispatch("paper-work/setMainFormProperties", {
            subject: e.value
          });
        }
      };
    }
  }
};
</script>
<style>
</style>
