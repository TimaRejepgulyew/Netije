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
        <DxLabel location="top" :text="$t('translations.fields.isCustomNumber')" />
      </DxSimpleItem>

      <DxSimpleItem data-field="number" :editor-options="numberOptions">
        <DxPatternRule :pattern="numberPattern" />
        <DxLabel location="top" :text="$t('translations.fields.regNumberDocument')" />
        <DxRequiredRule :message="$t('translations.fields.regNumberDocumentRequired')" />
      </DxSimpleItem>

      <DxSimpleItem
        data-field="documentRegisterId"
        :editor-options="documentRegisterOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel location="top" :text="$t('translations.fields.documentRegisterId')" />
        <DxRequiredRule :message="$t('translations.fields.documentRegisterRequired')" />
      </DxSimpleItem>

      <DxSimpleItem data-field="date" :editor-options="dateOptions" editor-type="dxDateBox">
        <DxLabel location="top" :text="$t('translations.fields.registrationDate')" />
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
        isCustomNumber: false,
        documentRegisterId: null,
        date: null,
        number: null
      },
      saveButtonOptions: {
        text: this.$t("translations.links.register"),
        useSubmitBehavior: true,
        type: "success"
      },
      numberPattern: ""
    };
  },
  computed: {
    filter() {
      return `?documentRegisterId=${this.store.documentRegisterId}&documentId=${
        this.documentId
      }&registrationDate=${moment(this.store.date).format("L")}`;
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
        if (autoNumbering) {
          this.store.isCustomNumber = false;

          return {
            disabled: true
          };
        }
      }
      return {
        disabled: false
      };
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
      return this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.paperWork.AvailableRegistries + this.documentId,
        onValueChanged: this.getDataByFilter
      });
    },
    documentId() {
      return this.$route.params.id;
    }
  },
  methods: {
    async getDataByFilter() {
      if (this.store.date && this.store.documentRegisterId) {
        const res = await this.$axios.get(
          dataApi.paperWork.PreliminaryNumber + this.filter
        );
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
      this.store.documentId = +this.documentId;
      this.$axios
        .post(dataApi.paperWork.RegisterDocument, this.store)
        .then(res => {
          this.$store.commit("paper-work/SET_REG_PROPERTIES", res.data);
          this.$store.commit("paper-work/SET_IS_REGISTERED", {
            documentId: +this.$route.params.id,
            state: 0
          });

          this.$emit("setPermissions", true);
          this.$emit("popupDisabled");
          this.notify(
            this.$t("translations.headers.registrationSucceded"),
            "success"
          );
        })
        .catch(e => {
          //TODO вывести ошибку not notify to popup
          this.notify(
            this.$t("translations.fields.registrationError"),
            "error"
          );
        });

      e.preventDefault();
    }
  }
};
</script>
<style  lang="scss" scoped>
</style>

