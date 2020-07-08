<template>
  <div class="toolbar">
    <DxPopup
      :showTitle="false"
      :visible.sync="showComment"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      :width="500"
      :height="'auto'"
    >
      <div>
        <comment-form @sendRequest="completeAssignment" @tooglePopup="tooglePopup" />
      </div>
    </DxPopup>
    <DxToolbar>
      <DxItem :visible="inProccess" :options="btnOptions" location="before" widget="dxButton" />
    </DxToolbar>
  </div>
</template>
<script>
import ReviewResult from "~/infrastructure/constants/reviewResult.js";
import commentForm from "~/components/assignment/comment-form.vue";
import { DxPopup } from "devextreme-vue/popup";
import reworkBtn from "~/components/assignment/rework-btn.vue";
import completeBtn from "~/components/assignment/complete-btn.vue";

import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import AssignmentType from "~/infrastructure/constants/assignmentType.js";
export default {
  components: {
    reworkBtn,
    completeBtn,
    DxToolbar,
    DxItem,
    DxPopup,
    commentForm
  },
  data() {
    return {
      showComment: false
    };
  },
  computed: {
    inProccess() {
      return this.$store.getters["currentAssignment/inProccess"];
    },
    btnOptions() {
      return {
        icon: "check",
        text: this.$t("buttons.complete"),
        onClick: this.tooglePopup
      };
    }
  },
  methods: {
    tooglePopup() {
      this.showComment = !this.showComment;
    },
    completeAssignment() {
      this.$awn.asyncBlock(
        this.$store.dispatch("currentAssignment/complete", ReviewResult.Accept),
        e => {
          this.$router.go(-1);
          this.$awn.success();
        },
        e => this.$awn.alert()
      );
    }
  }
};
</script>
<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>