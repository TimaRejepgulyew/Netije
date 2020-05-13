<template>
  <div class="toolbar">
    <DxToolbar>
      <DxItem :options="backButtonOptions" location="before" widget="dxButton" />
      <DxItem :options="sendButtonOptions" location="before" widget="dxButton" />
      <DxItem template="importanceChanger" location="before" widget="dxCheckBox" />
      <template #importanceChanger>
        <importanceChanger @importantChanged="importantChanged"></importanceChanger>
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
          this.$router.go(-1);
        }
      }
    };
  },
  computed: {
    sendButtonOptions() {
      return {
        ...this.$store.getters["globalProperties/btnSend"](this),
        onClick: () => {
          var res = this.$parent.$refs["form"].instance.validate();
          if (!res.isValid) return;
          this.$parent.handleSubmit();
        }
      };
    }
  },
  methods: {
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