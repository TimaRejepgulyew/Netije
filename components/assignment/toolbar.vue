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
        <DxTextArea
          placeholder="Введите отчет..."
          :visible="showComment"
          :on-value-changed="setComment"
          :height="150"
          :value="comment"
        >
          <DxValidator ref="textArea">
            <DxRequiredRule :message="$t('translations.fields.commentRequired')" />
          </DxValidator>
        </DxTextArea>
        <DxButton icon="check" text="okey" :on-click="currentRequest" />
        <DxButton icon="cancel" text="cancel" :on-click="toggleComment" />
      </div>
    </DxPopup>
    <DxToolbar>
      <DxItem :options="backButtonOptions" location="before" widget="dxButton" />
      <DxItem :visible="completeButtonsVisible" location="before" template="completeButton">
        <template #completeButton>
          <complete-btn />
        </template>
      </DxItem>
      <DxItem :visible="reworkButtonVisible" location="before" template="reworkButton">
        <template #reworkButton>
          <rework-btn />
        </template>
      </DxItem>
    </DxToolbar>
  </div>
</template>
<script>
import { DxPopup } from "devextreme-vue/popup";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import { DxTextArea } from "devextreme-vue";
import { confirm } from "devextreme/ui/dialog";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import { DxButton } from "devextreme-vue";
import AssignmentType from "~/infrastructure/constants/assignmentType.js";
import ReviewResult from "~/infrastructure/constants/reviewResult.js";
export default {
  components: {
    DxPopup,
    DxRequiredRule,
    DxValidator,
    DxTextArea,
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
      },
      comment: null,
      showComment: false,
      currentRequest: function() {}
    };
  },
  computed: {
    completeButtonsVisible() {
      return (
        this.getOptions().completeButtonsVisible &&
        !this.$store.getters["currentAssignment/isCompleted"]
      );
    },
    reworkButtonVisible() {
      return (
        this.getOptions().reworkButtonVisible &&
        !this.$store.getters["currentAssignment/isCompleted"]
      );
    },
    reworkButtonOptions() {
      return {
        type: "danger",
        text: this.$t("buttons.rework"),
        icon: "undo",
        onClick: () => {
          this.toggleComment();
          this.currentRequest = () => {
            this.$awn.asyncBlock(
              this.$store.dispatch(
                "currentAssignment/complete",
                ReviewResult.ForRework
              ),
              e => {
                this.$router.go(-1);
                this.$awn.success();
              },
              e => this.$awn.alert()
            );
          };
        }
      };
    },
    completeButtonOptions() {
      return {
        text: this.getOptions().completeButtonText,
        icon: "check",
        type: "success",
        onClick: () => {
          this.toggleComment();
          this.currentRequest = () => {
            if (this.checkisValid()) {
              this.$awn.asyncBlock(
                this.$store.dispatch(
                  "currentAssignment/complete",
                  ReviewResult.Accept
                ),
                e => {
                  this.$router.go(-1);
                  this.$awn.success();
                },
                e => this.$awn.alert()
              );
            }
          };
        }
      };
    }
  },
  methods: {
    setComment(e) {
      this.$store.commit("currentAssignment/SET_COMMENT", e.value);
    },
    toggleComment() {
      this.showComment = !this.showComment;
    },
    checkisValid() {
      if (
        this.$store.getters["currentAssignment/isActionItemExicutionAssignment"]
      ) {
        var res = this.$refs["textArea"].instance.validate();
        return res.isValid;
      } else {
        return true;
      }
    },
    getOptions() {
      switch (this.$store.getters["currentAssignment/assignmentType"]) {
        case AssignmentType.AcquaintanceFinishAssignment:
        case AssignmentType.SimpleAssignment:
        case AssignmentType.ActionItemExecutionAssignment:
          return {
            completeButtonsVisible: true,
            reworkButtonVisible: false,
            completeButtonText: this.$t("buttons.completed")
          };
        case AssignmentType.ActionItemSupervisorAssignment:
        case AssignmentType.ReviewAssignment:
          return {
            completeButtonsVisible: true,
            reworkButtonVisible: true,
            completeButtonText: this.$t("buttons.accept")
          };

        case AssignmentType.AcquaintanceAssignment:
          return {
            completeButtonsVisible: true,
            reworkButtonVisible: false,
            completeButtonText: this.$t("buttons.acquaintance")
          };
        default:
          return { completeButtonsVisible: false, reworkButtonVisible: false };
      }
    }
  }
};
</script>
<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>
