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
      :disabled="isDataChanged"
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
    },
    register() {
      this.isDocumentRegistrationPopupOpen = true;
    },
    unRegister() {
      let result = confirm(this.$t("translations.fields.areYouSure"));
      result.then(dialogResult => {
        if (dialogResult) {
          this.$awn.asyncBlock(
            this.$axios.post(dataApi.documentRegistration.UnregisterDocument, {
              documentId: +this.$route.params.id
            }),
            res => {
              this.$router.go();
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
  }
};
</script>