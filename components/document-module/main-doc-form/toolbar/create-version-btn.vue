<template>
  <div>
    <DxDropDownButton
      :use-select-mode="false"
      :items="profileSettings"
      :text="$t('buttons.createVersion')"
      :icon="profileSettings.icon"
      display-expr="name"
      key-expr="id"
      :dropDownOptions="{
        width: '200px',
      }"
      @item-click="onItemClick"
    >
    </DxDropDownButton>
    <toolbarItemUploadVersion
      :documentId="documentId"
      @uploadVersion="uploadVersion"
      ref="toolbarItemUploadVersion"
    />
  </div>
</template>

<script>
import DxDropDownButton from "devextreme-vue/drop-down-button";
import documentVersionService from "~/infrastructure/services/documentVersionService.js";
import { DxButton } from "devextreme-vue";
import dataApi from "~/static/dataApi";
import toolbarItemUploadVersion from "~/components/document-module/main-doc-form/toolbar/upload-version-button.vue";
import { click } from "@syncfusion/ej2-vue-spreadsheet";

export default {
  components: {
    DxButton,
    DxDropDownButton,
    toolbarItemUploadVersion,
  },
  props: ["documentId"],
  computed: {
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
    profileSettings() {
      return [
        {
          id: 1,
          type: "upload",
          name: this.$t("buttons.upload"),
          icon: "upload",
        },
        {
          id: 2,
          temp: "toolbarItemUploadVersion",
          type: "scaner",
          name: this.$t("buttons.fromScaner"),
          icon: "print",
        },
        {
          id: 3,
          type: "doc",
          name: this.$t("buttons.fromTemplate"),
          icon: "doc",
        },
        {
          id: 4,
          type: "docxfile",
          name: this.$t("buttons.fromDocx"),
          icon: "docxfile",
        },
        {
          id: 5,
          type: "xlsxfile",
          name: this.$t("buttons.fromXlsx"),
          icon: "xlsxfile",
        },
      ];
    },
  },
  methods: {
    uploadVersion() {
      this.$emit("uploadVersion");
    },
    onItemClick(e) {
      const type = e.itemData.type;
      switch (type) {
        case "upload":
          this.$refs.toolbarItemUploadVersion.$el.click();
          break;
        case "scaner":
          this.$popup.scannerDialog(this, {
            documentId: this.documentId,
          });
          break;
        case "docxfile":
          this.$popup.documentEditor(
            this,
            {},
            {
              showLoadingPanel: false,
              listeners: [
                {
                  eventName: "valueChanged",
                  handlerName: "uploadVersionFromFile",
                },
              ],
            }
          );
          break;
        default:
          console.log(type);
          break;
      }
    },
  },
};
</script>

<style lang="scss"></style>
