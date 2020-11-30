<template>
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
</template>
<script>
import TaskType from "~/infrastructure/constants/taskType.js";
import sendIcon from "~/static/icons/send.svg";
import DocumentSendAction from "~/infrastructure/models/DocumentSendAction.js";
import DxMenu from "devextreme-vue/menu";
import cardIcon from "~/static/icons/card.svg";
import DocumentVersionService from "~/infrastructure/services/documentVersionService";
import DocumentVersionViewer from "~/infrastructure/services/documentVersionViewer.js";
import { DxDropDownButton } from "devextreme-vue";
import dataApi from "~/static/dataApi";
export default {
  components: {
    DxMenu
  },
  props: ["attachment"],
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
      itemData.create(this, {
        documentId: this.attachment.entity.id,
        documentTypeGuid: this.attachment.entity.documentTypeGuid
      });
    },

    detachLink() {
      this.$emit("detach", this.attachment.attachmentId);
    },
    downloadDocument() {
      DocumentVersionService.downloadLastVersion(this, {
        ...this.attachment.entity
      });
    },
    previewDocument() {
      DocumentVersionViewer({
        context: this,
        options: {
          readOnly: true,
          extension: this.attachment.entity.extension,
          params: { documentId: this.attachment.entity.id }
        },
        lastVersion: true
      });
    }
  }
};
</script>
