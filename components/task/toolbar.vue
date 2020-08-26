<template>
  <div class="toolbar">
    <DxToolbar>
      <DxItem
        :visible="startBtnVisible"
        :options="startButtonOptions"
        location="before"
        widget="dxButton"
      />
      <DxItem
        :visible="isDraft"
        :disabled="!isDataChanged"
        :options="saveButtonOptions"
        location="before"
        widget="dxButton"
      />
      <DxItem
        :visible="inProcess"
        :options="abortButtonOptions"
        location="before"
        widget="dxButton"
      />
      <DxItem
        :visible="isCompleted||isAborted"
        :options="restartButtonOptions"
        location="before"
        widget="dxButton"
      />
      <DxItem template="importanceChanger" location="before" widget="dxCheckBox" />
      <template #importanceChanger>
        <importanceChanger :taskId="taskId" :read-only="!isDraft"></importanceChanger>
      </template>
      <DxItem
        :visible="!isNew&&isDraft||isAborted"
        :options="deleteButtonOptions"
        location="after"
        widget="dxButton"
      />
    </DxToolbar>
  </div>
</template>
<script>
import { confirm } from "devextreme/ui/dialog";
import importanceChanger from "~/components/task/importance-changer";
import { alert } from "devextreme/ui/dialog";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import { DxButton } from "devextreme-vue";
import AssignmentType from "~/infrastructure/constants/assignmentType.js";
import saveIcon from "~/static/icons/save.svg";
import abortIcon from "~/static/icons/stop.svg";
import restartIcon from "~/static/icons/restart.svg";
import attachmentVue from "../workFlow/attachment.vue";
export default {
  components: {
    importanceChanger,
    DxButton,
    DxToolbar,
    DxItem,
  },
  props: ["taskId"],
  inject: ["isValidTask"],

  computed: {
    startBtnVisible() {
      return this.isDraft && !this.task.isDraftResolution;
    },
    task() {
      return this.$store.getters[`tasks/${this.taskId}/task`];
    },
    isDataChanged() {
      return this.$store.getters[`tasks/${this.taskId}/isDataChanged`];
    },
    isNew() {
      return this.$store.getters[`tasks/${this.taskId}/isNew`];
    },
    isDraft() {
      return this.$store.getters[`tasks/${this.taskId}/isDraft`];
    },
    inProcess() {
      return this.$store.getters[`tasks/${this.taskId}/inProcess`];
    },
    isCompleted() {
      return this.$store.getters[`tasks/${this.taskId}/isCompleted`];
    },
    isAborted() {
      return this.$store.getters[`tasks/${this.taskId}/isAborted`];
    },

    saveButtonOptions() {
      return {
        icon: saveIcon,
        hint: this.$t("buttons.save"),
        onClick: () => {
          this.save();
        },
      };
    },
    startButtonOptions() {
      return {
        ...this.$store.getters["globalProperties/btnStart"](this),
        onClick: () => {
          if (
            this.validateAttachment() &&
            this.$parent.$refs["form"].instance.validate().isValid
          )
            this.$awn.asyncBlock(
              this.$store.dispatch(`tasks/${this.taskId}/start`),
              (e) => {
                this.$emit("onStart");
              },
              (e) => this.$awn.alert()
            );
        },
      };
    },
    abortButtonOptions() {
      return {
        icon: abortIcon,
        hint: this.$t("buttons.abort"),
        onClick: () => {
          if (this.isValidTask())
            this.$awn.asyncBlock(
              this.$store.dispatch(`tasks/${this.taskId}/abort`),
              (e) => {
                this.onClose();
              },
              (e) => this.$awn.alert()
            );
        },
      };
    },
    restartButtonOptions() {
      return {
        icon: restartIcon,
        hint: this.$t("buttons.restart"),
        onClick: () => {
          if (this.this.isValidTask())
            this.$awn.asyncBlock(
              this.$store.dispatch(`tasks/${this.taskId}/restart`),
              (e) => {
                this.onClose();
              },
              (e) => this.$awn.alert()
            );
        },
      };
    },
    deleteButtonOptions() {
      return {
        icon: "trash",
        hint: this.$t("buttons.delete"),
        onClick: async () => {
          let response = await confirm(
            this.$t("shared.areYouSureDeleteTask"),
            this.$t("shared.confirm")
          );
          if (response)
            this.$awn.asyncBlock(
              this.$store.dispatch(`tasks/${this.taskId}/delete`),
              (e) => {
                this.onClose();
              },
              (e) => this.$awn.alert()
            );
        },
      };
    },
  },
  methods: {
    onClose() {
      this.$emit("onClose");
    },
    generateHtmlError(attachments) {
      return attachments.map((attachment) => {
        if (!attachment.entities) {
          return `<li class="red">Вложите ${attachment.groupTitle.toLowerCase()}</li>`;
        }
      });
    },
    validateAttachment() {
      let isValid = true;
      let attachments = this.$store.getters[
        `tasks/${this.taskId}/task`
      ].attachmentGroups.filter((attachment) => attachment.isRequired);
      attachments.forEach((attachment) => {
        if (!attachment.entities) isValid = false;
      });
      if (!isValid) {
        alert(this.generateHtmlError(attachments), this.$t("shared.error"));
      }
      return isValid;
    },
    save() {
      if (
        this.validateAttachment() &&
        this.$parent.$refs["form"].instance.validate().isValid
      )
        this.$awn.asyncBlock(
          this.$store.dispatch(`tasks/${this.taskId}/save`),
          (e) => {
            this.$emit("onSave");
          },
          (e) => this.$awn.alert()
        );
    },
  },
};
</script>
<style >
.toolbar {
  margin-bottom: 10px;
}
li {
  list-style-type: none;
  list-style: none;
}
li.red {
  font-size: 14px;
  text-decoration: underline;
}
</style>