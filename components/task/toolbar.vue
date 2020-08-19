<template>
  <div class="toolbar">
    <DxToolbar>
      <DxItem :visible="isDraft" :options="startButtonOptions" location="before" widget="dxButton" />
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
    </DxToolbar>
  </div>
</template>
<script>
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
    DxItem
  },
  data() {
    return {
      taskId: this.$parent.taskId
    };
  },
  computed: {
    isDataChanged() {
      return this.$store.getters[`tasks/${this.taskId}/isDataChanged`];
    },
    isDraft() {
      console.log(
        this.$store.getters[`tasks/${this.taskId}/isDraft`],
        "isDraft"
      );
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
        }
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
              e => {
                this.backTo();
              },
              e => this.$awn.alert()
            );
        }
      };
    },
    abortButtonOptions() {
      return {
        icon: abortIcon,
        hint: this.$t("buttons.abort"),
        onClick: () => {
          if (this.$parent.$refs["form"].instance.validate().isValid)
            this.$awn.asyncBlock(
              this.$store.dispatch(`tasks/${this.taskId}/abort`),
              e => {
                this.backTo();
              },
              e => this.$awn.alert()
            );
        }
      };
    },
    restartButtonOptions() {
      return {
        icon: restartIcon,
        hint: this.$t("buttons.restart"),
        onClick: () => {
          if (this.$parent.$refs["form"].instance.validate().isValid)
            this.$awn.asyncBlock(
              this.$store.dispatch(`tasks/${this.taskId}/restart`),
              e => {
                this.backTo();
              },
              e => this.$awn.alert()
            );
        }
      };
    }
  },
  methods: {
    backTo() {
      this.$emit("backTo");
    },
    generateHtmlError(attachments) {
      return attachments.map(attachment => {
        if (!attachment.entities) {
          return `<li class="red">Вложите ${attachment.groupTitle.toLowerCase()}</li>`;
        }
      });
    },
    validateAttachment() {
      let isValid = true;
      let attachments = this.$store.getters[
        `tasks/${this.taskId}/task`
      ].attachmentGroups.filter(attachment => attachment.isRequired);
      attachments.forEach(attachment => {
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
          e => {},
          e => this.$awn.alert()
        );
    }
  }
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