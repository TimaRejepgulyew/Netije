<template>
  <div>
    <DxPopup
      width="90%"
      height="95%"
      :showTitle="false"
      :visible.sync="isOpenGrid"
      :drag-enabled="false"
      :close-on-outside-click="true"
    >
      <div>
        <documentGrid
          v-if="isOpenGrid"
          :documentQuery="100"
          @selectedDocument="onSelectedDocument"
        />
      </div>
    </DxPopup>
    <DxPopup
      width="90%"
      height="95%"
      :showTitle="false"
      :visible.sync="isOpenShowAttacmentCard"
      :drag-enabled="false"
      :close-on-outside-click="true"
    >
      <div>
        <document-card
          class="card"
          @onClose="togglePopupCard"
          v-if="isOpenShowAttacmentCard"
          :documentId="attachmentId"
          :isCard="true"
        />
      </div>
    </DxPopup>
    <DxPopup
      width="90%"
      height="95%"
      :showTitle="false"
      :visible.sync="isOpenShowCreateNewAttacmentCard"
      :drag-enabled="false"
      :close-on-outside-click="true"
    >
      <div>
        <document-card
          class="card"
          v-if="isOpenShowCreateNewAttacmentCard"
          @onClosed="pasteAttachment"
          @onClose="togglePopupCardCreateAttachment"
          :documentId="attachmentId"
          :isCard="true"
        />
      </div>
    </DxPopup>
    <div class="d-flex align-center">
      <span class="dx-form-group-caption">{{ group.groupTitle }}</span>
      <sup v-if="group.isRequired" class="red">*</sup>
      <addDocumentBtn
        v-if="group.canAddAttachments"
        @createDocument="createDocument"
        @showDocumentGrid="togglePopupGrid"
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
          if (group.canAddAttachments) togglePopupGrid();
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
  createDocument
} from "~/infrastructure/services/documentService.js";
import documentField from "~/components/workFlow/attachment/field-document-attachment.vue";
import { DxButton } from "devextreme-vue";
import dataApi from "~/static/dataApi";
import DataSource from "devextreme/data/data_source";
import EntityTypes from "~/infrastructure/constants/entityTypes.js";
import DxSelectBox from "devextreme-vue/select-box";
import { DxPopup } from "devextreme-vue/popup";
export default {
  components: {
    DxSelectBox,
    DxButton,
    addDocumentBtn,
    documentGrid: async () =>
      await import("~/components/document-module/document-grid.vue"),
    documentCard: async () =>
      await import("~/components/document-module/main-doc-form/index.vue"),
    DxPopup,
    documentField
  },
  data() {
    return {
      isOpenShowCreateNewAttacmentCard: false,
      isOpenShowAttacmentCard: false,
      isOpenGrid: false,
      attachmentId: false
    };
  },
  props: ["group"],

  methods: {
    onSelectedDocument({ documentTypeGuid, id }) {
      this.pasteAttachment({ documentTypeGuid, id });
      this.togglePopupGrid();
    },
    showAttachmentCard({ id, documentTypeGuid }) {
      this.$awn.asyncBlock(
        load(this, { documentId: id, documentTypeGuid }),
        () => {
          this.attachmentId = id;
          this.togglePopupCard();
        }
      );
    },
    createDocument(documentType) {
      this.$awn.asyncBlock(
        createDocument(this, { documentType }),
        ({ documentId, documentTypeGuid }) => {
          this.attachmentId = documentId;
          this.togglePopupCardCreateAttachment();
        },
        e => {
          this.$awn.alert();
        }
      );
    },
    togglePopupCardCreateAttachment() {
      this.isOpenShowCreateNewAttacmentCard = !this
        .isOpenShowCreateNewAttacmentCard;
    },
    togglePopupCard() {
      this.isOpenShowAttacmentCard = !this.isOpenShowAttacmentCard;
    },
    togglePopupGrid() {
      this.isOpenGrid = !this.isOpenGrid;
    },
    detach(attachmentId) {
      this.$emit("detach", attachmentId);
    },
    pasteAttachment({ documentTypeGuid, id }) {
      this.$emit("pasteAttachment", {
        attachmentId: id,
        groupId: this.group.groupId,
        entityTypeGuid: mapToEntityType(documentTypeGuid)
      });
    }
  },
  computed: {
    hasGroupItem() {
      return this.group.entities;
    }
  }
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
