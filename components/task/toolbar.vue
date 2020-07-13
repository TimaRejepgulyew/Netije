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
        <importanceChanger :read-only="!isDraft"></importanceChanger>
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
      key: this.$parent.key
    };
  },
  computed: {
    isDataChanged() {
      return this.$store.getters["currentTask/isDataChanged"](this.key);
    },
    isDraft() {
      return this.$store.getters["currentTask/isDraft"](this.key);
    },
    inProcess() {
      return this.$store.getters["currentTask/inProcess"](this.key);
    },
    isCompleted() {
      return this.$store.getters["currentTask/isCompleted"](this.key);
    },
    isAborted() {
      return this.$store.getters["currentTask/isAborted"](this.key);
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
              this.$store.dispatch("currentTask/startAndLoad", {
                key: this.key
              }),
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
              this.$store.dispatch("currentTask/abort", { key: this.key }),
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
              this.$store.dispatch("currentTask/restart", { key: this.key }),
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
      let attachments = this.$store.getters["currentTask/task"](
        this.key
      ).attachmentGroups.filter(attachment => attachment.isRequired);
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
          this.$store.dispatch("currentTask/saveAndLoad", { key: this.key }),
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