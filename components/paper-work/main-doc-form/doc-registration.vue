<template>
  <DxForm
    :col-count="1"
    :form-data.sync="store"
    :read-only="false"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    validation-group="OfficialDocument"
  >
    <DxGroupItem :col-count="1">
      <DxGroupItem
        :visible="this.$route.params.id !='add'"
        :caption="$t('translations.fields.registration')"
      >
        <DxSimpleItem data-field="number" :editor-options="numberOptions">
          <DxLabel location="top" :text="$t('translations.fields.regNumberDocument')" />
        </DxSimpleItem>

        <DxSimpleItem
          data-field="documentRegisterId"
          :editor-options="documentRegisterOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="top" :text="$t('translations.fields.documentRegisterId')" />
        </DxSimpleItem>

        <DxSimpleItem data-field="date" :editor-options="dateOptions" editor-type="dxDateBox">
          <DxLabel location="top" :text="$t('translations.fields.registrationDate')" />
        </DxSimpleItem>
      </DxGroupItem>
      <DxGroupItem :caption="$t('translations.fields.storing')">
        <DxSimpleItem
          data-field="caseFileId"
          :editor-options="caseFileOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="top" :text="$t('translations.fields.caseFileId')" />
        </DxSimpleItem>

        <DxSimpleItem
          data-field="placedToCaseFileDate"
          :editor-options="placedToCaseFileDateOptions"
          editor-type="dxDateBox"
        >
          <DxLabel location="top" :text="$t('translations.fields.placedToCaseFileDate')" />
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
      caseFileId,
      placedToCaseFileDate
    });
    return {
      isUpdating: false,
      store: {
        placedToCaseFileDate,
        caseFileId,
        documentRegisterId,
        date: registrationDate,
        number: registrationNumber
      },
      isDefaultName: false,
      isSaved: false
    };
  },
  methods: {
    modified() {
      if (this.$route.params.id != "add") {
        console.log("watch");
        this.$emit("eventWatch");
      }
    }
  },
  computed: {
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
        //TODO корректный адресс
        url:
          "http://192.168.4.198/api/DocumentRegistry/Registration/" +
          this.$route.params.id,
        disabled: true
      });
    },
    caseFileOptions() {
      return this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.docFlow.CaseFile,
        filter: ["status", "=", 0],
        value: "title"
      });
    }
  }
};
</script>
<style>
</style>
