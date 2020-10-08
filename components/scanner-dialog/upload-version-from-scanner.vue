<template>
  <div>
    <DxPopup
      :visible.sync="isOpenPopup"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="false"
      width="90%"
      maxHeight="95%"
      height="auto"
    >
      <div>
        <scanner-dialog v-if="isOpenPopup" @onSave="uploadVersionFromFile" />
      </div>
    </DxPopup>
    <DxButton
      :hint="$t('buttons.createFromScanner')"
      :icon="fromScannerIcon"
      @click="showScannerDialog"
    />
  </div>
</template>

<script>
import scannerDialog from "~/components/scanner-dialog/index.vue";
import fromScannerIcon from "~/static/icons/fromScanner.png";
import { alert } from "devextreme/ui/dialog";
import documentService from "~/infrastructure/services/documentVersionService.js";
import { DxPopup } from "devextreme-vue/popup";
import DxFileUploader from "devextreme-vue/file-uploader";
import dataApi from "~/static/dataApi";
import { DxButton } from "devextreme-vue";
export default {
  components: {
    DxFileUploader,
    DxButton,
    DxPopup,
    scannerDialog,
  },
  props: ["documentId"],
  data() {
    return {
      fromScannerIcon,
      associatedApplication: [],
      isOpenPopup: false,
    };
  },
  computed: {
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
  },
  methods: {
    togglePopup() {
      this.isOpenPopup = !this.isOpenPopup;
    },
    showScannerDialog() {
      console.log("show scanner dialog");
      this.$awn.asyncBlock(this.$scanner.tryConnect(), (connected) => {
        if (!connected) {
          alert(`document.message.setupFor`, this.$t("shared.error"));
          return false;
        } else {
          this.togglePopup();
        }
      });
    },
    uploadVersionFromFile(e) {
      if (!this.document.subject) {
        this.$store.dispatch(
          `documents/${this.documentId}/setSubject`,
          e.file.name.split(".").slice(0, -1).join(".")
        );
      }
      this.$awn.async(
        documentService.uploadVersion(this.document, e.file, this),
        (e) => {
          this.$store.commit(
            `documents/${this.documentId}/SET_VERSION`,
            e.data
          );
        },
        () => {}
      );
    },
  },
};
</script>

