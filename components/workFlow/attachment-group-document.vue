<template>
  <div>
    <DxPopup
      width="90%"
      height="90%"
      :showTitle="false"
      :visible.sync="isOpenGrid"
      :drag-enabled="false"
      :close-on-outside-click="true"
    >
      <div>
        <documentGrid v-if="isOpenGrid" :documentQuery="100" @selectedDocument="pasteAttachment" />
      </div>
    </DxPopup>
    <DxPopup
      width="90%"
      height="95%"
      :showTitle="false"
      :visible.sync="isOpenCard"
      :drag-enabled="false"
      :close-on-outside-click="true"
    >
      <div>
        <document-card
          class="card"
          v-if="isOpenCard"
          @onClose="togglePopupCard"
          :documentId="attachmentId"
          :isCard="true"
        />
      </div>
    </DxPopup>
    <div class="d-flex align-center">
      <span class="dx-form-group-caption">{{group.groupTitle}}</span>
      <sup v-if="group.isRequired" class="red">*</sup>
      <DxButton
        :id="'addAttachment'+group.groupId"
        class="btn--green"
        :visible="group.canAddAttachments"
        icon="plus"
        styling-mode="text"
        :hint="$t('buttons.add')"
        :on-click="togglePopupGrid"
      ></DxButton>
    </div>
    <ul v-if="hasGroupItem">
      <li v-for="groupItem in group.entities" :key="groupItem.entityId">
        <documentField @detach="detach" @showCard="showCard" :item="groupItem" />
      </li>
    </ul>
    <div
      v-else
      class="d-flex group__description"
      :class="{'cursor-pointer':group.canAddAttachments}"
      @click="()=>{if(group.canAddAttachments)togglePopupGrid()}"
    >
      <i class="dx-icon dx-icon-link"></i>
      <label :for="'addAttachment'+group.groupId" class="f-grow-1">{{group.description}}</label>
    </div>
  </div>
</template>

<script>
import { mapToEntityType } from "~/infrastructure/constants/documentType.js";
import { load } from "~/infrastructure/services/documentService.js";
import documentField from "~/components/workFlow/field-document-attachment.vue";
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
    documentGrid: async () =>
      await import("~/components/document-module/document-grid.vue"),
    documentCard: async () =>
      await import("~/components/document-module/main-doc-form/index.vue"),
    DxPopup,
    documentField,
  },
  data() {
    return {
      isOpenCard: false,
      isOpenGrid: false,
      attachmentId: false,
    };
  },
  props: ["group",],

  methods: {
    showCard({ id, documentTypeGuid }) {
      this.$awn.asyncBlock(
        load(this, { documentId: id, documentTypeGuid }),
        () => {
          this.isOpenCard = true;
        }
      );
      this.attachmentId = id;
    },
    togglePopupCard() {
      this.isOpenCard = !this.isOpenCard;
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
        entityTypeGuid: mapToEntityType(documentTypeGuid),
      });
      this.togglePopupGrid();
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
