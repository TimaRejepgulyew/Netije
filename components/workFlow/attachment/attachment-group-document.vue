<template>
  <div>
    <div class="d-flex align-center">
      <span class="dx-form-group-caption">{{ group.groupTitle }}</span>
      <sup v-if="group.isRequired" class="red">*</sup>
      <addDocumentBtn
        v-if="group.canAddAttachments"
        @createDocument="createDocument"
        @showDocumentGrid="showdocumentGrid"
      />
    </div>
    <ul v-if="hasGroupItem">
      <li v-for="groupItem in group.entities" :key="groupItem.entityId">
        <documentField
          @detach="detach"
          @showCard="showAttachmentCard"
          :item="groupItem"
        />
      </li>
    </ul>
    <div
      v-else
      class="d-flex group__description"
      :class="{ 'cursor-pointer': group.canAddAttachments }"
      @click="
        () => {
          if (group.canAddAttachments) showdocumentGrid();
        }
      "
    >
      <i class="dx-icon dx-icon-link"></i>
      <label :for="'addAttachment' + group.groupId" class="f-grow-1">{{
        group.description
      }}</label>
    </div>
  </div>
</template>

<script>
import addDocumentBtn from "~/components/workFlow/attachment/attachment-components/add-document-btn.vue";
import { mapToEntityType } from "~/infrastructure/constants/documentType.js";
import {
  load,
  createDocument,
} from "~/infrastructure/services/documentService.js";
import documentField from "~/components/workFlow/attachment/field-document-attachment.vue";
import { DxButton } from "devextreme-vue";
import dataApi from "~/static/dataApi";
import DataSource from "devextreme/data/data_source";
import EntityTypes from "~/infrastructure/constants/entityTypes.js";
import DxSelectBox from "devextreme-vue/select-box";
export default {
  components: {
    DxSelectBox,
    DxButton,
    addDocumentBtn,
    documentGrid: async () =>
      await import("~/components/document-module/document-grid.vue"),

    documentField,
  },
  props: ["group"],

  methods: {
    showAttachmentCard({ id, documentTypeGuid }) {
      this.$popup.documentCard(
        this,
        {
          params: { documentId: id, documentTypeGuid },
          handler: load,
        },
        {
          // TODO listeners refresh attachments
        }
      );
    },
    showdocumentGrid() {
      this.$popup.documentGrid(
        this,
        {},
        {
          listeners: [
            { eventName: "valueChanged", handlerName: "pasteAttachment" },
          ],
          showLoadingPanel: false,
        }
      );
    },
    createDocument(documentType) {
      this.$popup.documentCard(
        this,
        {
          params: { documentType },
          handler: createDocument,
        },
        {
          listeners: [
            { eventName: "valueChanged", handlerName: "pasteAttachment" },
          ],
        }
      );
    },
    detach(attachmentId) {
      this.$emit("detach", attachmentId);
    },
    pasteAttachment({ documentTypeGuid, id }) {
      this.$emit("pasteAttachment", {
        attachmentId: id,
        groupId: this.group.groupId,
        entityTypeGuid: mapToEntityType(documentTypeGuid),
      });
    },
  },
  computed: {
    hasGroupItem() {
      return this.group.entities;
    },
  },
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.red {
  color: red;
  font-size: 17px;
}
.f-grow-1 {
  flex-grow: 1;
}
.group__description {
  padding: 20px 10px;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: darken($base-border-color, 30%);
  .dx-icon.dx-icon-link {
    font-size: 20px;
    padding-right: 10px;
  }
}
.cursor-pointer,
.cursor-pointer label {
  cursor: pointer;
}
.align-center {
  align-items: center;
}
.btn--green {
  margin-left: 10px;

  font-size: 20px;
  font-weight: bold;
  .dx-icon-plus {
    color: $base-accent;
    padding: 0;
    font-size: 20px;
  }
}
.pb-1 {
  padding-bottom: 10px;
}

ul {
  padding: 0;
  li {
    list-style: none;
  }
}
.card {
  height: 85vh;
}
</style>
