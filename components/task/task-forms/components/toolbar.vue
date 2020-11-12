<template>
  <div class="toolbar">
    <DxToolbar>
      <DxItem
        v-for="(toolbarItem, index) in toolbarItemsByTaskType"
        :key="index"
        :visible="toolbarItem.visible"
        :options="toolbarItem.options"
        :location="toolbarItem.location"
        :widget="toolbarItem.widget"
        :template="toolbarItem.template"
        :disabled="toolbarItem.disabled"
      />
      <template #toolbarItemStartBtn>
        <toolbar-item-start-btn @onStart="onStart" :taskId="taskId" />
      </template>
      <template #toolbarItemImportanceChanger>
        <toolbarItemImportanceChanger
          :taskId="taskId"
        ></toolbarItemImportanceChanger>
      </template>
      <!-- <DxItem
        template="toolbarItemStartBtn"
        :visible="canStart"
        location="before"
      />
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
     
      <DxItem
        :visible="canDelete"
        :options="deleteButtonOptions"
        location="after"
        widget="dxButton"
      /> -->
      <template #toolbarItemAccessRight>
        <toolbar-item-access-right
          :entity-type="entityType"
          :entity-id="taskId"
        />
      </template>

      <template #toolbarItemswichToCompoundActionItem>
        <toolbarItemSwitchToCompound :taskId="taskId" />
      </template>
    </DxToolbar>
  </div>
</template>
<script>
import ToolbarByTaskType from "~/infrastructure/factory/taskToolbarByTaskType.js";
import { mapToEntityType } from "~/infrastructure/constants/taskType.js";
import { confirm } from "devextreme/ui/dialog";
import toolbarItemSwitchToCompound from "~/components/task/task-forms/components/action-item-exicution/switch-to-compound-btn.vue";
import toolbarItemStartBtn from "~/components/task/task-forms/components/start-btn.vue";
import toolbarItemImportanceChanger from "~/components/task/task-forms/components/importance-changer.vue";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import AssignmentType from "~/infrastructure/constants/assignmentType.js";
import saveIcon from "~/static/icons/save.svg";
import abortIcon from "~/static/icons/stop.svg";
import restartIcon from "~/static/icons/restart.svg";
import attachmentVue from "~/components/workFlow/attachment/index.vue";
import toolbarItemAccessRight from "~/components/page/access-right.vue";
export default {
  components: {
    toolbarItemSwitchToCompound,
    toolbarItemImportanceChanger,
    toolbarItemAccessRight,
    toolbarItemStartBtn,
    DxToolbar,
    DxItem
  },
  props: ["taskId"],
  inject: ["isValidTask"],
  data() {
    return {
      isPopupAccesRight: false
    };
  },
  created() {
    console.log(this.toolbarItemsByTaskType);
  },
  computed: {
    toolbarItemsByTaskType() {
      return ToolbarByTaskType(this, this.task.taskType);
    },
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
        }
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
            e => {},
            e => this.$awn.alert()
          );
        }
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
            e => {},
            e => this.$awn.alert()
          );
        }
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
              e => {
                this.$emit("onRemove");
              },
              e => this.$awn.alert()
            );
        }
      };
    }
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
          e => {
            this.$emit("onSave");
          },
          e => this.$awn.alert()
        );
    }
  }
};
</script>
<style>
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
