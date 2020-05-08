<template>
  <div v-if="canRegisterDocument" class="navBar">
    <DxButton
      v-if="state.isRegistered"
      :text="$t('translations.fields.cancelRegistration')"
      :onClick="this.popupVisible"
      icon="clear"
    ></DxButton>
    <DxButton
      v-else
      :disabled=" !state.documentSaved"
      :text="$t('translations.fields.registration')"
      icon="bulletlist"
      :onClick="this.popupVisible"
    ></DxButton>
  </div>
</template>
<script>
import Docflow from "~/infrastructure/constants/docflows";
import EntityType from "~/infrastructure/constants/entityTypes";
import { DxButton } from "devextreme-vue";
export default {
  components: {
    DxButton
  },
  props: ["registrationState"],

  methods: {
    popupVisible() {
      this.$emit("popupVisible");
    }
  },
  computed: {
    state() {
      return this.registrationState;
    },
    canRegisterDocument() {
      console.log(this.$store.getters["paper-work/documentKind"]("documentFlow"))
      return (
        this.registrationState.isRegistrable &&
        this.$store.getters["permissions/allowRegisterDocument"](
          this.entityType
        )
      );
    },
    entityType() {
      switch (this.$store.getters["paper-work/documentKind"]("documentFlow")) {
        case Docflow.Incoming:
          return EntityType.IncomingDocument;
          break;
        case Docflow.Outgoing:
          return EntityType.OutgoingDocument;
          break;
        case Docflow.Internal:
          return EntityType.InternalDocument;
          break;
        default:
          throw "Unknown document type";
      }
    }
  }
};
</script>