<template>
  <scanner-dialog
    @closeScanDialog="closeScanDialog"
    @fileSaved="uploadVersionFromFile"
  />
</template>

<script>
import scannerDialog from "~/components/scanner-dialog/index.vue";
import fromScannerIcon from "~/static/icons/fromScanner.png";
import { alert } from "devextreme/ui/dialog";
import documentService, {
  base64toBlob,
} from "~/infrastructure/services/documentVersionService.js";
import dataApi from "~/static/dataApi";
export default {
  components: {
    scannerDialog,
  },
  props: ["documentId"],
  data() {
    return {
      file: null,
      fromScannerIcon,
    };
  },
  computed: {
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
  },
  methods: {
    closeScanDialog() {
      this.$emit("close");
    },
    uploadVersionFromFile(e) {
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
  async mounted() {
    let connected = await this.$scanner.tryConnect();
    if (!connected) {
      alert(
        this.$t("scanner.alert.checkSwichOnScannerApp"),
        this.$t(`scanner.alert.error`)
      );
      this.$emit("close");
    } else {
      this.$emit("loadStatus");
    }
  },
};
</script>