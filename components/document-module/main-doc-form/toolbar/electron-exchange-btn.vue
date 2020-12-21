<template>
  <DxButton
    :icon="elexchangeIcon"
    :text="$t('buttons.elExchange')"
    :hint="$t('buttons.elExchange')"
    :on-click="sendToElExchange"
  />
</template>

<script>
import dataApi from "~/static/dataApi.js";
import elexchangeIcon from "~/static/icons/document-module/el-exchage.svg";
import DxButton from "devextreme-vue/button";
import { confirm } from "devextreme/ui/dialog";
export default {
  components: {
    DxButton
  },
  props: {
    documentId: {
      type: Number
    }
  },
  data() {
    return {
      elexchangeIcon
    };
  },
  methods: {
    async sendToElExchange() {
      const result = await confirm(
        this.$t("document.confirm.sureSendToElectronExchangeService"),
        this.$t("shared.areYouSure")
      );
      if (result)
        this.$awn.asyncBlock(
          this.$axios.post(dataApi.documentModule.Exchange, {
            documentId: this.documentId
          }),
          () => {
            this.$awn.success();
          },
          () => {
            this.$awn.alert();
          }
        );
    }
  }
};
</script>

<style></style>
