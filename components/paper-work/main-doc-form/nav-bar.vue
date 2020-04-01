<template>
  <div v-if="registryState.isRegsitrible" class="navBar">
    <DxButton
      v-if="registryState.isRegistered"
      :text="$t('translations.fields.cancelRegistration')"
      icon="clear"
    ></DxButton>
    <DxButton
      v-else
      :disabled=" !registryState.registeryAllowed"
      :text="$t('translations.fields.registration')"
      icon="bulletlist"
      :onClick="this.popupVisible"
    ></DxButton>
  </div>
</template>
<script>
import dataApi from "~/static/dataApi";
import { DxButton } from "devextreme-vue";
import notify from "devextreme/ui/notify";
export default {
  components: {
    DxButton
  },
  props: ["registryState"],

  methods: {
    popupVisible() {
      this.$emit("popupVisible");
    }
  }
};
</script>
<style  lang="scss" scoped>
.text--warning {
  color: crimson;
}
</style>