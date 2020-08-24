<template>
  <div class="d-flex f-direction-column">
    <div class="d-flex message-text">{{messageText}}</div>
    <a :href="link.path" class="link">{{link.text}}</a>
    <div>
      <DxButton
        :icon="btnOptions.icon"
        :stylingMode="btnOptions.stylingMode"
        :text="btnOptions.text"
        :onClick="btnOptions.onClick"
      />
    </div>
  </div>
</template>

<script>
import { DxButton } from "devextreme-vue";
export default {
  components: {
    DxButton,
  },
  data() {
    return {
      link: {
        text: this.$t("doсumentRegistration.toDocFlow"),
        path: "/docflow",
      },
      messageText: this.$t("doсumentRegistration.notFindDocumentRegistration"),
      btnOptions: {
        icon: "close",
        stylingMode: "outlined",
        text: this.$t("buttons.closed"),
        onClick: () => {
          this.$emit("hidePopup");
        },
      },
    };
  },
};
</script>

<style>
</style>