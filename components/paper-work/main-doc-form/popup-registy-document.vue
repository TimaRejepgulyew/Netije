<template>
  <form @submit="handleSubmit">
    <DxForm
      :form-data="store"
      :read-only="false"
      :show-colon-after-label="true"
      :show-validation-summary="true"
      validation-group="changeRole"
    >
      <DxSimpleItem
        data-field="isCustomNumber"
        :editor-options="isCustomNumberOptions"
        editor-type="dxCheckBox"
      >
        <DxLabel :text="$t('translations.fields.isCustomNumber')" />
      </DxSimpleItem>

      <DxSimpleItem data-field="number" :editor-options="numberOptions">
        <DxPatternRule :pattern="numberPattern" />
        <DxLabel :text="$t('translations.fields.regNumberDocument')" />
        <DxRequiredRule :message="$t('translations.fields.regNumberDocumentRequired')" />
      </DxSimpleItem>

      <DxSimpleItem
        data-field="documentRegisterId"
        :editor-options="documentRegisterOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel :text="$t('translations.fields.documentRegisterId')" />
        <DxRequiredRule :message="$t('translations.fields.documentRegisterRequired')" />
      </DxSimpleItem>

      <DxSimpleItem data-field="date" :editor-options="dateOptions" editor-type="dxDateBox">
        <DxLabel :text="$t('translations.fields.registrationDate')" />
        <DxRequiredRule :message="$t('translations.fields.registrationDateRequired')" />
      </DxSimpleItem>

      <DxButtonItem :button-options="saveButtonOptions" horizontal-alignment="right" />
    </DxForm>
  </form>
</template>
<script>
import moment from "moment";
import dataApi from "~/static/dataApi";
import { DxButton } from "devextreme-vue";
import notify from "devextreme/ui/notify";
import DataSource from "devextreme/data/data_source";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxButtonItem,
  DxLabel,
  DxRequiredRule,
  DxRangeRule,
  DxStringLengthRule,
  DxPatternRule,
  DxAsyncRule
} from "devextreme-vue/form";
export default {
  components: {
    DxGroupItem,
    DxSimpleItem,
    DxButtonItem,
    DxLabel,
    DxRequiredRule,
    DxPatternRule,
    DxRangeRule,
    DxStringLengthRule,
    DxForm,
    DxAsyncRule,
    DxButton
  },
  props: ["doctype"],
  data() {
    return {
      store: {
        isCustomNumber: true,
        documentRegisterId: null,
        date: null,
        number: null
      },
      saveButtonOptions: {
        height: 50,
        text: this.$t("translations.links.save"),
        useSubmitBehavior: true,
        type: "success"
      },
      numberPattern: ""
    };
  },
  computed: {
    address() {
      return dataApi.docFlow.PreliminaryNumber;
    },
    filter() {
      return `?documentRegisterId=${
        this.store.documentRegisterId
      }&documentId=10&registrationDate=${moment(this.store.date).format("L")}`;
    },
    isCustomNumberOptions() {
      const numberingType = this.$store.getters["paper-work/documentKind"](
        "numberingType"
      );
      let autoNumbering;
      if (numberingType == 2) {
        autoNumbering = this.$store.getters["paper-work/documentKind"](
          "autoNumbering"
        );
      }

      if (numberingType == 2 && autoNumbering) {
        this.store.isCustomNumber = false;

        return {
          disabled: true
        };
      } else {
        return {
          disabled: false
        };
      }
    },
    numberOptions() {
      return {
        disabled: !this.store.isCustomNumber
      };
    },
    dateOptions() {
      return {
        onValueChanged: this.getDataByFilter
      };
    },
    documentRegisterOptions() {
      return {
        dataSource: new DataSource({
          store: this.$dxStore({
            key: "id",
            loadUrl:
              "http://192.168.4.198/api/DocumentRegistry/Registration/" + "10"
          })
        }),
        onValueChanged: this.getDataByFilter,
        valueExpr: "id",
        displayExpr: "name"
      };
    },
    // isDisabled(){
    //   const re
    // }
    documentId() {
      return this.$store.getters["paper-work/documentId"];
    }
  },
  methods: {
    async getDataByFilter() {
      if (this.store.date && this.store.documentRegisterId) {
        const res = await this.$axios.get(this.address + this.filter);
        this.store.number = res.data.preliminaryNumber;
        this.numberPattern = res.data.pattern;
      }
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
      this.store.documentId = this.documentId;
      this.$axios
        .post(this.address, this.store)
        .then(res => {
          this.$emit("popupDisabled");
          this.notify(
            this.$t("translations.headers.updateDocRegistrySucces"),
            "success"
          );
        })
        .catch(e => {
          this.notify(this.$t("translations.fields.addNewRolesError"), "error");
        });

      e.preventDefault();
    }
  }
};
</script>
<style  lang="scss" scoped>
</style>

