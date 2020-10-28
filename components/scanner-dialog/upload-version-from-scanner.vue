<template>
  <div>
    <DxPopup
      :visible.sync="isOpenPopup"
      :drag-enabled="false"
      :close-on-outside-click="false"
      :show-title="false"
      width="90%"
      maxHeight="95%"
      height="auto"
    >
      <div>
        <scanner-dialog
          v-if="isOpenPopup"
          @closeScanDialog="togglePopup"
          @fileSaved="uploadVersionFromFile"
        />
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
import documentService, {
  base64toBlob,
} from "~/infrastructure/services/documentVersionService.js";
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
      file: null,
      fromScannerIcon,
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
      this.$awn.asyncBlock(this.$scanner.tryConnect(), (connected) => {
        if (!connected) {
          alert(
            this.$t("scanner.alert.checkSwichOnScannerApp"),
            this.$t(`scanner.alert.error`)
          );
          return false;
        } else {
          this.togglePopup();
        }
      });
    },
    uploadVersionFromFile(e) {
      this.togglePopup();
      const blob = base64toBlob(e.file, "application/pdf");
      this.$awn.async(
        documentService.uploadVersion(this.document, blob, this, "file.pdf"),
        (res) => {
          this.file = e.file;
          this.$store.commit(
            `documents/${this.documentId}/SET_VERSION`,
            res.data
          );
          this.$emit("uploadVersion");
        }
      );
    },
  },
};
</script>

