<template>
  <div>
    <DxButton
      :visible="canIntranetExchange"
      :icon="elexchangeIcon"
      :text="$t('buttons.intranetExchange')"
      :hint="$t('buttons.intranetExchange')"
      :on-click="sendToElExchange"
    />
    <DxButton
      :visible="canElExchange && !canIntranetExchange"
      :icon="elexchangeIcon"
      :text="$t('buttons.elExchange')"
      :hint="$t('buttons.elExchange')"
      :on-click="sendToElExchange"
    />
  </div>
</template>

<script>
import dataApi from "~/static/dataApi.js";
import elexchangeIcon from "~/static/icons/document-module/el-exchange.svg";
import DxButton from "devextreme-vue/button";
import { confirm, alert } from "devextreme/ui/dialog";
export default {
  components: {
    DxButton,
  },
  props: {
    documentId: {
      type: Number,
    },
    canIntranetExchange: {
      type: Boolean,
    },
    canElExchange: {
      type: Boolean,
    },
  },
  data() {
    return {
      elexchangeIcon,
    };
  },
  computed: {
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
  },
  methods: {
    sendToIntranetExchange() {},
    async sendToElExchange() {
      if (!this.document?.ourSignatory) {
        alert(
          this.$t("document.validation.ourSignatoryRequired"),
          this.$t("shared.error")
        );
        return;
      }
      const result = await confirm(
        this.$t("document.confirm.sureSendToElectronExchangeService"),
        this.$t("shared.areYouSure")
      );
      if (result)
        this.$awn.asyncBlock(
          this.$axios.post(dataApi.documentModule.Exchange, {
            documentId: this.documentId,
          }),
          () => {
            this.$store.commit(
              `documents/${this.documentId}/SET_EXCHANGED`,
              true
            );
            this.$awn.success();
          },
          () => {
            this.$awn.alert();
          }
        );
    },
  },
};
</script>

<style></style>
