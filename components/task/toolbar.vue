<template>
  <div class="toolbar">
    <DxToolbar>
      <DxItem
        template="toolbarItemStartBtn"
        :visible="canStart"
        location="before"
      />
      <template #toolbarItemStartBtn>
        <toolbar-item-start-btn @onStart="onStart" :taskId="taskId" />
      </template>
      <DxItem
        :visible="canSave"
        :disabled="!isDataChanged"
        :options="saveButtonOptions"
        location="before"
        widget="dxButton"
      />
      <DxItem
        :visible="canAbort"
        :options="abortButtonOptions"
        location="before"
        widget="dxButton"
      />
      <DxItem
        :visible="canRestart"
        :options="restartButtonOptions"
        location="before"
        widget="dxButton"
      />
      <DxItem
        template="toolbarItemImportanceChanger"
        :disabled="!isDraft"
        location="before"
        widget="dxCheckBox"
      />
      <template #toolbarItemImportanceChanger>
        <toolbarItemImportanceChanger
          :taskId="taskId"
        ></toolbarItemImportanceChanger>
      </template>
      <DxItem
        :visible="canDelete"
        :options="deleteButtonOptions"
        location="after"
        widget="dxButton"
      />
      <DxItem location="after" template="toolbarItemAccessRight" />
      <template #toolbarItemAccessRight>
        <toolbar-item-access-right
          :entity-type="entityType"
          :entity-id="taskId"
        />
      </template>
    </DxToolbar>
  </div>
</template>
<script>
import { mapToEntityType } from "~/infrastructure/constants/taskType.js";
import { confirm } from "devextreme/ui/dialog";
import toolbarItemStartBtn from "~/components/task/start-btn.vue";
import toolbarItemImportanceChanger from "~/components/task/importance-changer";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import AssignmentType from "~/infrastructure/constants/assignmentType.js";
import saveIcon from "~/static/icons/save.svg";
import abortIcon from "~/static/icons/stop.svg";
import restartIcon from "~/static/icons/restart.svg";
import attachmentVue from "../workFlow/attachment.vue";
import toolbarItemAccessRight from "~/components/page/access-right.vue";
export default {
  components: {
    toolbarItemImportanceChanger,
    toolbarItemAccessRight,
    toolbarItemStartBtn,
    DxToolbar,
    DxItem,
  },
  props: ["taskId"],
  inject: ["isValidTask"],
  data() {
    return {
      isPopupAccesRight: false,
    };
  },
  computed: {
    entityType() {
      return mapToEntityType(this.task.taskType);
    },
    canDelete() {
      return (
        this.$store.getters[`tasks/${this.taskId}/canDelete`] && !this.isNew
      );
    },
    canSave() {
      return this.isDraft;
    },

    canRestart() {
      return this.isCompleted || this.isAborted;
    },
    canStart() {
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
    isUnderReview() {
      return this.$store.getters[`tasks/${this.taskId}/isUnderReview`];
    },
    canAbort() {
      return this.inProcess || this.isUnderReview;
    },
    saveButtonOptions() {
      return {
        icon: saveIcon,
        hint: this.$t("buttons.save"),
        text: this.$t("buttons.save"),
        onClick: () => {
          this.save();
        },
      };
    },
    abortButtonOptions() {
      return {
        icon: abortIcon,
        hint: this.$t("buttons.abort"),
        text: this.$t("buttons.abort"),
        onClick: async () => {
          const response = await confirm(
            this.$t("task.message.sureAbortTask"),
            this.$t("shared.confirm")
          );
          if (!response) return false;
          this.$awn.asyncBlock(
            this.$store.dispatch(`tasks/${this.taskId}/abort`),
            (e) => {
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
        text: this.$t("buttons.restart"),
        onClick: async () => {
          const response = await confirm(
            this.$t("task.message.sureRestartTask"),
            this.$t("shared.confirm")
          );
          if (!response) return false;
          this.$awn.asyncBlock(
            this.$store.dispatch(`tasks/${this.taskId}/restart`),
            (e) => {
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
        text: this.$t("buttons.delete"),
        onClick: async () => {
          let response = await confirm(
            this.$t("shared.areYouSureDeleteTask"),
            this.$t("shared.confirm")
          );
          if (response)
            this.$awn.asyncBlock(
              this.$store.dispatch(`tasks/${this.taskId}/delete`),
              (e) => {
                this.$emit("onRemove");
              },
              (e) => this.$awn.alert()
            );
        },
      };
    },
  },
  methods: {
    onStart() {
      this.$emit("onStart");
    },
    onClose() {
      this.$emit("onClose");
    },
    save() {
      if (this.isValidTask())
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
