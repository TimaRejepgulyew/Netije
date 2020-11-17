<template>
  <div>
    <DxPopup
      :visible.sync="isOpenPopup"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      width="90%"
      maxHeight="95%"
      height="auto"
    >
      <div class="scrool-auto">
        <task-card
          @onClose="tooglePopup"
          :taskId="taskId"
          v-if="isOpenPopup"
          :isCard="true"
        />
      </div>
    </DxPopup>
    <DxMenu
      :adaptivityEnabled="true"
      :data-source="menuOptions"
      show-first-submenu-mode="onHover"
      orientation="vertical"
      submenu-direction="auto"
      :hide-submenu-on-mouse-leave="true"
      display-expr="text"
      @item-click="onItemClick"
    />
  </div>
</template>
<script>
import { DxPopup } from "devextreme-vue/popup";
import TaskType from "~/infrastructure/constants/taskType.js";
import sendIcon from "~/static/icons/send.svg";
import DocumentSendAction from "~/infrastructure/models/DocumentSendAction.js";
import DxMenu from "devextreme-vue/menu";
import cardIcon from "~/static/icons/card.svg";
import DocumentService from "~/infrastructure/services/documentVersionService";
import { DxDropDownButton } from "devextreme-vue";
import dataApi from "~/static/dataApi";
export default {
  components: {
    DxMenu,
    DxPopup,
    taskCard: () => import("~/components/task/index.vue")
  },
  props: ["attachment"],
  data() {
    return {
      isOpenPopup: false,
      taskId: false
    };
  },
  computed: {
    menuOptions() {
      const canPreview =
        this.attachment.entity.hasVersions &&
        this.attachment.entity.canBeOpenedWithPreview;
      return [
        {
          icon: "overflow",
          items: [
            {
              type: "preview",
              visible: canPreview,
              icon: "pdffile",
              text: this.$t("buttons.preview")
            },
            {
              type: "download",
              visible: this.attachment.entity.hasVersions,
              icon: "download",
              text: this.$t("buttons.download")
            },
            {
              type: "detach",
              visible: this.attachment.canDetach,
              icon: "trash",
              text: this.$t("buttons.deleteLink")
            },
            {
              type: "card",
              icon: cardIcon,
              text: this.$t("buttons.showCard")
            },
            {
              type: "availableAction",
              icon: sendIcon,
              text: this.$t("buttons.send"),
              items: this.items
            }
          ]
        }
      ];
    },
    items() {
      const availableActions = [
        ...this.attachment.entity?.availableActions,
        TaskType.SimpleTask
      ] || [TaskType.SimpleTask];
      const items = Object.values(
        new DocumentSendAction(this).init().filtering(availableActions)
      );
      return items;
    }
  },
  methods: {
    showCard() {
      this.$emit("showCard");
    },
    onItemClick(e) {
      if (!e.itemData.items)
        switch (e.itemData.type) {
          case "preview":
            this.previewDocument();
            break;
          case "download":
            this.downloadDocument();
            break;
          case "detach":
            this.detachLink();
            break;
          case "card":
            this.showCard();
            break;
          default:
            this.createTask(e.itemData);
        }
    },
    createTask(itemData) {
      this.$awn.asyncBlock(
        itemData.create(this, {
          documentId: this.attachment.entity.id,
          documentTypeGuid: this.attachment.entity.documentTypeGuid
        }),
        ({ taskType, taskId }) => {
          this.showRelationDocument(taskId);
        },
        () => {}
      );
    },
    showRelationDocument(taskId) {
      this.taskId = taskId;
      this.tooglePopup();
    },
    tooglePopup() {
      this.isOpenPopup = !this.isOpenPopup;
    },
    detachLink() {
      this.$emit("detach", this.attachment.attachmentId);
    },
    downloadDocument() {
      DocumentService.downloadDocument(
        {
          ...this.attachment.entity,
          extension: this.attachment.entity.extension
        },
        this
      );
    },
    previewDocument() {
      DocumentService.previewDocument(this.attachment.entity, this);
    }
  }
};
</script>
