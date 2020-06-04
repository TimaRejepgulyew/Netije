<template>
  <div class="toolbar">
    <DxToolbar>
      <DxItem :options="backButtonOptions" location="before" widget="dxButton" />
      <DxItem :visible="isDraft" :options="startButtonOptions" location="before" widget="dxButton" />
      <DxItem :visible="isDraft" :options="saveButtonOptions" location="before" widget="dxButton" />
      <DxItem template="importanceChanger" location="before" widget="dxCheckBox" />
      <template #importanceChanger>
        <importanceChanger></importanceChanger>
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
        text: this.$t("buttons.back"),
        onClick: () => {
          this.backTo();
        }
      }
    };
  },
  computed: {
    isDraft() {
      return this.$store.getters["currentTask/isDraft"];
    },
    saveButtonOptions() {
      return {
        ...this.$store.getters["globalProperties/btnSave"](this),
        onClick: () => {
          if (this.$parent.$refs["form"].instance.validate().isValid)
            this.$awn.asyncBlock(
              this.$store.dispatch("currentTask/start"),
              e => {
                this.backTo();
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
              this.$store.dispatch("currentTask/start"),
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
    },
    importantChanged(value) {
      this.$emit("importantChanged", value);
    }
  }
};
</script>
<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>