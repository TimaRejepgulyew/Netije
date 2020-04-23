<template>
  <DxForm
    :col-count="1"
    :form-data.sync="store"
    :read-only="!hasPermission"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    validation-group="OfficialDocument"
  >
    <DxGroupItem :col-count="1">
      <DxGroupItem
        :visible="this.$route.params.id !='add'"
        :caption="$t('translations.fields.registration')"
      >
        <DxSimpleItem data-field="registrationNumber" :editor-options="numberOptions">
          <DxLabel location="top" :text="$t('translations.fields.regNumberDocument')" />
        </DxSimpleItem>

        <DxSimpleItem
          data-field="documentRegisterId"
          :editor-options="documentRegisterOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="top" :text="$t('translations.fields.documentRegisterId')" />
        </DxSimpleItem>

        <DxSimpleItem
          data-field="registrationDate"
          :editor-options="dateOptions"
          editor-type="dxDateBox"
        >
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
  created() {
    this.$store.commit("paper-work/SET_REG_PROPERTIES", {
      documentRegisterId: this.store.documentRegisterId,
      registrationDate: this.store.registrationDate,
      registrationNumber: this.store.registrationNumber
    });
  },
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
      store: {
        placedToCaseFileDate,
        caseFileId,
        documentRegisterId,
        registrationDate,
        registrationNumber
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
    hasPermission() {
      if (this.$route.params.id != "add") {
      
        this.store = {
          ...this.store,
          ...this.$store.getters["paper-work/regProperties"]
        };
      }
      return this.$store.getters["paper-work/hasPermissions"];
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
        disabled: this.hasPermission
      };
    },
    dateOptions() {
      return {
        disabled: this.hasPermission
      };
    },
    documentRegisterOptions() {
      return this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        //TODO корректный адресс
        url: dataApi.docFlow.DocumentRegistry,
        disabled: this.hasPermission
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
