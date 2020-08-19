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
        <document-registration-popup
          :documentId="documentId"
          v-if="isDocumentRegistrationPopupOpen"
          @hidePopup="hidePopup"
        />
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
      :text="$t('translations.fields.register')"
      :hint="$t('translations.fields.register')"
      :icon="registerIcon"
      :onClick="register"
    ></DxButton>
  </div>
</template>

<script>
import registerIcon from "~/static/icons/stamp.svg";
import dataApi from "~/static/dataApi";
import { confirm } from "devextreme/ui/dialog";
import { DxPopup } from "devextreme-vue/popup";
import DocumentRegistrationPopup from "~/components/document-registration/popups/registration-popup.vue";
import Docflow from "~/infrastructure/constants/docflows";
import { DxButton } from "devextreme-vue";
export default {
  components: {
    DxButton,
    DxPopup,
    DocumentRegistrationPopup,
  },
  props: ["documentId"],
  data() {
    return {
      registerIcon,
      isDocumentRegistrationPopupOpen: false,
    };
  },
  methods: {
    hidePopup() {
      this.isDocumentRegistrationPopupOpen = false;
    },
    register() {
      if (this.isDataChanged) {
        if (
          this.$parent.$parent.$parent.$parent.$refs["form"].instance.validate()
            .isValid
        )
          this.$awn.asyncBlock(
            this.$store.dispatch(`documents/${this.documentId}/save`),
            (res) => {
              this.$awn.success(this.$t("document.saved"));
              this.isDocumentRegistrationPopupOpen = true;
            },
            (e) => {
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
      result.then((dialogResult) => {
        if (dialogResult) {
          this.$awn.asyncBlock(
            this.$store.dispatch(`documents/${this.documentId}/unRegister`),
            (res) => {
              this.$awn.success();
            },
            (err) => {
              this.$awn.alert();
            }
          );
        }
      });
    },
  },
  computed: {
    isDataChanged() {
      return this.$store.getters[`documents/${this.documentId}/isDataChanged`];
    },
    isRegistered() {
      return this.$store.getters[`documents/${this.documentId}/isRegistered`];
    },
  },
  watch: {
    isDocumentRegistrationPopupOpen: function (value) {
      if (!value) {
        this.hidePopup();
      }
    },
  },
};
</script>