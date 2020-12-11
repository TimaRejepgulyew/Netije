<template>
  <div class="navBar">
    <DxToolbar>
      <DxItem locateInMenu="auto" :options="saveButtonOptions" location="before" widget="dxButton" />
    </DxToolbar>
  </div>
</template>
<script>
//servises
import { load, refresh } from "~/infrastructure/services/documentService.js";
import documentVersionService from "~/infrastructure/services/documentVersionService.js";
//components
import { confirm } from "devextreme/ui/dialog";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import { DxButton } from "devextreme-vue";
import toolbarItemUploadVersion from "~/components/document-module/main-doc-form/toolbar/upload-version-button.vue";
import toolbarItemAccessRight from "~/components/access-right/entity-access-right/access-right.vue";
//constants
import DocumentTypeGuid from "~/infrastructure/constants/documentType.js";
import { mapToEntityType } from "~/infrastructure/constants/documentType.js";
import dataApi from "~/static/dataApi";
import Docflow from "~/infrastructure/constants/docflows";
import EntityType from "~/infrastructure/constants/entityTypes";
//icons
import saveIcon from "~/static/icons/save.svg";
export default {
  components: {
    toolbarItemUploadVersion,
    toolbarItemAccessRight,
    DxButton,
    DxToolbar,
    DxItem
  },
  props: ["isCard"],
  data() {
    return {
      saveIcon
    };
  },
  computed: {
    saveButtonOptions() {
      return {
        icon: saveIcon,
        disabled: !this.canUpdate,
        onClick: async () => {
          console.log(212334);
          // await this.trySaveDocument();
        }
      };
    }
  }
};
</script>
<style scoped>
.navBar {
  margin: 5px 0px;
}
</style>