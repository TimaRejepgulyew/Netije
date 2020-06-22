<template>
  <div class="toolbar">
    <DxToolbar>
      <DxItem :options="backButtonOptions" location="before" widget="dxButton" />
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
        <importanceChanger :read-only="inProcess"></importanceChanger>
      </template>
    </DxToolbar>
  </div>
</template>
<script>
import importanceChanger from "~/components/task/importance-changer";
import { confirm } from "devextreme/ui/dialog";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import { DxButton } from "devextreme-vue";
import AssignmentType from "~/infrastructure/constants/assignmentType.js";
import ReviewResult from "~/infrastructure/constants/reviewResult.js";
import saveIcon from "~/static/icons/save.svg";
import abortIcon from "~/static/icons/stop.svg";
import restartIcon from "~/static/icons/restart.svg";
export default {
  components: {
    importanceChanger,
    DxButton,
    DxToolbar,
    DxItem
  },
  data() {
    return {
      backButtonOptions: {
        type: "normal",
        icon: "back",
        hint: this.$t("buttons.back"),
        saveIcon,
        abortIcon,
        restartIcon,
        onClick: () => {
          this.backTo();
        }
      }
    };
  },
  computed: {
    isDataChanged() {
      return this.$store.getters["currentTask/isDataChanged"];
    },
    isDraft() {
      return this.$store.getters["currentTask/isDraft"];
    },
    inProcess() {
      return this.$store.getters["currentTask/inProcess"];
    },
    isCompleted() {
      return this.$store.getters["currentTask/isCompleted"];
    },
    isAborted() {
      return this.$store.getters["currentTask/isAborted"];
    },

    saveButtonOptions() {
      return {
        icon: saveIcon,
        hint: this.$t("buttons.save"),
        onClick: () => {
          if (this.$parent.$refs["form"].instance.validate().isValid)
            this.$awn.asyncBlock(
              this.$store.dispatch("currentTask/saveAndLoad"),
              e => {
                this.$awn.success();
              },
              e => this.$awn.alert()
            );
        }
      };
    },
    startButtonOptions() {
      return {
        ...this.$store.getters["globalProperties/btnStart"](this),
        onClick: () => {
          if (this.$parent.$refs["form"].instance.validate().isValid)
            this.$awn.asyncBlock(
              this.$store.dispatch("currentTask/startAndLoad"),
              e => {
                this.backTo();
                this.$awn.success();
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
              this.$store.dispatch("currentTask/abort"),
              e => {
                this.backTo();
                this.$awn.success();
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
              this.$store.dispatch("currentTask/restart"),
              e => {
                this.backTo();
                this.$awn.success();
              },
              e => this.$awn.alert()
            );
        }
      };
    }
  },
  methods: {
    backTo() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>