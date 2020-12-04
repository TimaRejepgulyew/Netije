<template>
  <scanner-dialog
    v-if="connected"
    @closeScanDialog="closeScanDialog"
    @fileSaved="valueChanged"
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
      connected: false,
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
    valueChanged(e) {
      const blob = base64toBlob(e.file, "application/pdf");
      this.$emit("valueChanged", { file: blob });
      this.closeScanDialog();
    },
  },
  async mounted() {
    this.connected = await this.$scanner.tryConnect();
    if (!this.connected) {
      alert(
        this.$t("scanner.alert.checkSwichOnScannerApp"),
        this.$t(`scanner.alert.error`)
      );
      this.$emit("close");
    } else {
      this.$emit("loadStatus");
      this.$emit("showTitle", this.$t("scanner.header"));
    }
  },
};
</script>
