<template>
  <form @submit.prevent="generateReport">
    <DxForm :form-data="reportParams" validation-group="DocumentFlowReport">
      <DxItem
        data-field="from"
        editor-type="dxDateBox"
        :editor-options="dateBoxOptions"
        :validation-rules="validationRules.startDateRequired"
      >
        <DxLabel location="left" :text="$t('paperWork.reports.beginDate')" />
      </DxItem>
      <DxItem
        data-field="to"
        editor-type="dxDateBox"
        :editor-options="dateBoxOptions"
        :validation-rules="validationRules.endDateRequired"
      >
        <DxLabel location="left" :text="$t('paperWork.reports.endDate')" />
      </DxItem>
      <DxItem
        data-field="documentRegisterId"
        :editor-options="reportSelectBoxOptions"
        editor-type="dxSelectBox"
        :validation-rules="validationRules.journalRequired"
      >
        <DxLabel location="left" :text="$t('paperWork.reports.journal')" />
      </DxItem>
      <DxButtonItem :button-options="buttonOptions" horizontal-alignment="right" />
    </DxForm>
  </form>
</template>

<script>
import { DxForm, DxButtonItem, DxItem, DxLabel } from "devextreme-vue/form";
import dataApi from "~/static/dataApi";
import docflowConstants from "~/infrastructure/constants/docflows.js";
import SelectBoxOptionsBuilder from "~/infrastructure/builders/selectBoxOptionsBuilder.js";
import { saveAs } from "file-saver";
export default {
  components: {
    DxForm,
    DxItem,
    DxLabel,
    DxButtonItem
  },
  props: {
    options: {
      type: Object
    }
  },
  data() {
    return {
      reportParams: {
        from: null,
        to: null,
        documentRegisterId: null
      }
    };
  },
  computed: {
    buttonOptions() {
      return {
        text: this.$t(`paperWork.reports.saveBtn`),
        useSubmitBehavior: true
      };
    },
    dateBoxOptions() {
      return {
        openOnFieldClick: true
      };
    },
    reportSelectBoxOptions() {
      const builder = new SelectBoxOptionsBuilder();
      const options = builder
        .withUrl(
          dataApi.docFlow.DocumentRegister.UserDocumentRegistersForRegistration
        )
        .filter(["documentFlow", "=", docflowConstants[this.options.reportId]])
        .withoutDeferRendering()
        .build(this);
      return {
        ...options
      };
    },
    validationRules() {
      return {
        startDateRequired: [
          {
            type: "required",
            message: this.$t("paperWork.validation.startDateRequired")
          }
        ],
        endDateRequired: [
          {
            type: "required",
            message: this.$t("paperWork.validation.endDateRequired")
          }
        ],
        journalRequired: [
          {
            type: "required"
          }
        ]
      };
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    downloadFile(response) {
      console.log(response);
      const blob = new Blob(
        [response],
        {
          type: `data:${response.type}`
        },
        e => {
          console.error(e.response);
        }
      );
      saveAs(
        blob,
        `${this.$t(`paperWork.reports.${this.options.reportId}`)}.docx`
      );
    },
    generateReport() {
      this.$awn.asyncBlock(
        this.$axios.post(
          dataApi.docFlow.DocumentRegisterReport.Generate,
          this.reportParams,
          { responseType: "blob" }
        ),
        ({ data }) => {
          this.downloadFile(data);
          this.close();
          this.$awn.success();
        }
      );
    }
  },
  async created() {
    this.$emit("showTitle", this.$t(this.options.popupTitle));
    this.$emit("loadStatus");
  }
};
</script>

<style lang="scss"></style>
