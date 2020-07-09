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
        <comment-form @sendRequest="sendResult" @tooglePopup="tooglePopup" />
      </div>
    </DxPopup>
    <DxToolbar>
      <DxItem :visible="inProccess" :options="btnOptions" location="before" widget="dxButton" />
      <DxItem
        :visible="inProccess"
        :options="reworkBtnOptions"
        location="before"
        widget="dxButton"
      />
    </DxToolbar>
  </div>
</template>
<script>
import ReviewResult from "~/infrastructure/constants/revievResult/baseResult.js";
import commentForm from "~/components/assignment/comment-form.vue";
import { DxPopup } from "devextreme-vue/popup";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import AssignmentType from "~/infrastructure/constants/assignmentType.js";
export default {
  components: {
    DxToolbar,
    DxItem,
    DxPopup,
    commentForm
  },
  data() {
    return {
      showComment: false,
      result: null
    };
  },
  computed: {
    inProccess() {
      return this.$store.getters["currentAssignment/inProccess"];
    },
    btnOptions() {
      return {
        icon: "check",
        text: this.$t("buttons.accept"),
        onClick: () => {
          this.result = ReviewResult.Accept;
          this.tooglePopup();
        }
      };
    },
    reworkBtnOptions() {
      return {
        icon: "undo",
        text: this.$t("buttons.rework"),
        onClick: () => {
          this.result = ReviewResult.ForRework;
          this.tooglePopup();
        }
      };
    }
  },
  methods: {
    tooglePopup() {
      this.showComment = !this.showComment;
    },
    sendResult() {
      this.$awn.asyncBlock(
        this.$store.dispatch("currentAssignment/complete", this.result),
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