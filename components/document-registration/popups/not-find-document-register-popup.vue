<template>
  <div class="d-flex f-direction-column">
    <div class="d-flex message-text">{{messageText}}</div>
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
      messageText: this.$t("documentRegistration.notFindDocumentRegistrationSetting"),
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

