<template>
  <div v-if="showNavBar" class="navBar">
    <DxButton
      v-if="registryState.isRegistered"
      :text="$t('translations.fields.cancelRegistration')"
      :on-click="this.cancelRegiter"
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
    },
    cancelRegiter() {
      this.$axios.post(dataApi.paperWork.UnregisterDocument, {
        documentId: +this.$route.params.id
      });
    }
  },
  computed: {
    showNavBar() {
      return (
        this.registryState.isRegsitrible &&
        this.$store.getters["permissions/allowRegisterDocument"](
          this.entityType
        )
      );
    },
    entityType() {
      switch (+this.$store.getters["paper-work/documentKind"]("id")) {
        case 1:
          return "IncomingDocument";
          break;
        case 2:
          return "OutgoingDocument";
          break;
        default:
          return "InternalDocument";
          break;
      }
    }
  }
};
</script>
<style  lang="scss" scoped>
.text--warning {
  color: crimson;
}
</style>