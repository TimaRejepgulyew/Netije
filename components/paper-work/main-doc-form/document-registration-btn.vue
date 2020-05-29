<template>
  <div class="navBar">
    <DxPopup
      :visible.sync="isDocumentRegistrationPopupOpen"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      :width="500"
      :height="'auto'"
      :title="$t('translations.fields.registration')"
    >
      <div>
        <document-registration-popup @hidePopup="hidePopup" />
      </div>
    </DxPopup>
    <DxButton
      v-if="isRegistered"
      :text="$t('translations.fields.cancelRegistration')"
      :onClick="unRegister"
      icon="clear"
    ></DxButton>
    <DxButton
      v-else
      :text="$t('translations.fields.registration')"
      icon="check"
      :onClick="register"
    ></DxButton>
  </div>
</template>

<script>
import dataApi from "~/static/dataApi";
import { confirm } from "devextreme/ui/dialog";
import { DxPopup } from "devextreme-vue/popup";
import DocumentRegistrationPopup from "~/components/paper-work/main-doc-form/document-registration-popup";
import Docflow from "~/infrastructure/constants/docflows";
import EntityType from "~/infrastructure/constants/entityTypes";
import { DxButton } from "devextreme-vue";
export default {
  components: {
    DxButton,
    DxPopup,
    DocumentRegistrationPopup
  },

  data() {
    return {
      isDocumentRegistrationPopupOpen: false
    };
  },
  methods: {
    hidePopup() {
      this.isDocumentRegistrationPopupOpen = false;
      this.$store.commit("currentDocument/CLAER_REGISTRATION_DATA");
    },
    register() {
      if (!this.isDataChanged) {
        if (
          this.$parent.$parent.$parent.$parent.$refs["form"].instance.validate()
            .isValid
        )
          this.$awn.asyncBlock(
            this.$store.dispatch("currentDocument/save"),
            res => {
              this.$awn.success();
              this.isDocumentRegistrationPopupOpen = true;
            },
            e => {
              this.$awn.alert();
            }
          );
      } else {
        this.isDocumentRegistrationPopupOpen = true;
      }
    },
    unRegister() {
      let result = confirm(
        this.$t("translations.fields.areYouSureCancelRegistration"),
        this.$t("shared.confirm")
      );
      result.then(dialogResult => {
        if (dialogResult) {
          this.$awn.asyncBlock(
            this.$store.dispatch("currentDocument/unRegister"),
            res => {
              this.$awn.success();
            },
            err => {
              this.$awn.alert();
            }
          );
        }
      });
    }
  },
  computed: {
    isDataChanged() {
      return this.$store.getters["currentDocument/isDataChanged"];
    },
    isRegistered() {
      return this.$store.getters["currentDocument/isRegistered"];
    },
    entityType() {
      switch (this.$store.getters["paper-work/documentKind"]("documentFlow")) {
        case Docflow.Incoming:
          return EntityType.IncomingDocument;
        case Docflow.Outgoing:
          return EntityType.OutgoingDocument;

        case Docflow.Internal:
          return EntityType.InternalDocument;
      }
    }
  },
  watch: {
    isDocumentRegistrationPopupOpen: function(value) {
      if (!value) {
        this.hidePopup();
      }
    }
  }
};
</script>