<template>
  <div class="d-flex f-direction-column">
    <div class="d-flex message-text">{{messageText}}</div>
    <DxButton
      :icon="btnOptions.icon"
      :stylingMode="btnOptions.stylingMode"
      :text="btnOptions.text"
      :onClick="btnOptions.onClick"
    />
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
      messageText: this.$t("doсumentRegistration.notFindDocumentRegister"),
      btnOptions: {
        icon: "back",
        stylingMode: "outlined",
        text: this.$t("shared.closed"),
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