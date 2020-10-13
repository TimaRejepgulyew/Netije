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
          @closeScanDialog="togglePopup"
          @onSave="uploadVersionFromFile"
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
  props: ["documentId", "storeName"],
  data() {
    return {
      fromScannerIcon,
      isOpenPopup: false,
    };
  },
  computed: {
    document() {
      return this.$store.getters[
        `${this.storeName}/${this.documentId}/document`
      ];
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
      this.$awn.async(
        documentService.uploadVersion(this.document, e.file, this),
        (e) => {
          this.$store.commit(
            `${this.storeName}/${this.documentId}/SET_VERSION`,
            e.data
          );
        },
        () => {}
      );
    },
  },
};
</script>

