<template>
  <DxForm
    :col-count="1"
    :form-data.sync="store"
    :read-only="false"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    validation-group="incommingLetter"
  >
    <DxGroupItem :col-count="2">
      <DxGroupItem :col-count="1" :caption="$t('translations.fields.main')">
        <DxSimpleItem data-field="name" :editor-options="nameOptions">
          <DxLabel :text="$t('translations.fields.nameRequired')" />
          <DxRequiredRule :message="$t('translations.fields.nameRequired')" />
        </DxSimpleItem>

        <DxSimpleItem
          data-field="subject"
          :editor-options="subjectOptions"
          editor-type="dxTextArea"
        >
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

      <DxGroupItem
        :visible="this.$route.params.id !='add'"
        :caption="$t('translations.fields.registration')"
      >
        <DxSimpleItem data-field="number" :editor-options="numberOptions">
          <DxLabel :text="$t('translations.fields.regNumberDocument')" />
        </DxSimpleItem>

        <DxSimpleItem
          data-field="documentRegisterId"
          :editor-options="documentRegisterOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel :text="$t('translations.fields.documentRegisterId')" />
        </DxSimpleItem>

        <DxSimpleItem data-field="date" :editor-options="dateOptions" editor-type="dxDateBox">
          <DxLabel :text="$t('translations.fields.registrationDate')" />
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

        <DxSimpleItem
          data-field="placedToCaseFileDate"
          :editor-options="placedToCaseFileDateOptions"
          editor-type="dxDateBox"
        >
          <DxLabel :text="$t('translations.fields.placedToCaseFileDate')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="note" :editor-options="noteOptions" editor-type="dxTextArea">
          <DxLabel :text="$t('translations.fields.note')" />
        </DxSimpleItem>
      </DxGroupItem>
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
      name,
      caseFileId,
      placedToCaseFileDate,
      note
    });
    // if (context.$route.params.id != "add") {
    // this.$store.dispatch("paper-work/setDocumentKind", documentKindId);
    // }
    return {
      isUpdating: false,
      store: {
        name,
        subject,
        note,
        placedToCaseFileDate,
        caseFileId,
        documentKindId,
        documentRegisterId,
        date: registrationDate,
        number: registrationNumber
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
    modified() {
      if (this.$route.params.id != "add") {
        this.$emit("eventWatch");
      }
    }
  },
  computed: {
    defaultName() {
      return this.$store.getters["paper-work/defaultName"](this.docType, this);
    },
    documentKindOptions() {
      return {
        dataSource: new DataSource({
          store: this.$dxStore({
            key: "id",
            loadUrl: dataApi.docFlow.DocumentKind
          }),
          filter: [
            ["documentTypeId", "=", this.docType],
            "and",
            ["status", "=", 0]
          ]
        }),
        value: this.defaultDocKind
          ? this.defaultDocKind
          : this.store.defaultDocKindId,
        onSelectionChanged: e => {
          if (e.selectedItem) {
            this.isDefaultName = true;
            this.$store.dispatch("paper-work/setMainFormProperties", {
              documentKind: e.selectedItem
            });
          } else {
            this.isDefaultName = false;
            this.$store.dispatch("paper-work/setMainFormProperties", {
              documentKind: {}
            });
          }
        },
        onValueChanged: () => {
          this.modified();
        },
        showClearButton: true,
        valueExpr: "id",
        displayExpr: "name"
      };
    },
    nameOptions() {
      return {
        value: this.isDefaultName ? this.defaultName : "",
        disabled: this.isDefaultName,
        onValueChanged: e => {
          e.value = this.isDefaultName ? this.defaultName : "";
          this.$store.dispatch("paper-work/setMainFormProperties", {
            name: e.value
          });
          this.modified();
        }
      };
    },
    subjectOptions() {
      return {
        onValueChanged: e => {
          this.$store.dispatch("paper-work/setMainFormProperties", {
            subject: e.value
          });
          this.modified();
        }
      };
    },
    noteOptions() {
      return {
        onValueChanged: e => {
          this.$store.dispatch("paper-work/setMainFormProperties", {
            note: e.value
          });
          this.modified();
        }
      };
    },
    placedToCaseFileDateOptions() {
      return {
        onValueChanged: e => {
          this.$store.dispatch("paper-work/setMainFormProperties", {
            placedToCaseFileDate: e.value
          });
          this.modified();
        }
      };
    },

    numberOptions() {
      return {
        disabled: true
      };
    },
    dateOptions() {
      return {
        disabled: true
      };
    },
    documentRegisterOptions() {
      return this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url:
          "http://192.168.4.198/api/DocumentRegistry/Registration/" +
          this.$route.params.id,
        disabled: true
      });
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
    }
  }
};
</script>
<style>
form {
  margin: 10px;
}
</style>
