<template>
  <div>
    <div class="toolbar">
      <DxToolbar>
        <DxItem
          locateInMenu="auto"
          :visible="tollbarItemVisible"
          :options="btnForExecutionOptions"
          location="before"
          widget="dxButton"
        />

        <DxItem
          locateInMenu="auto"
          :disabled="btnForwardDisabled"
          :visible="!isRework"
          :options="btnForwardOptions"
          location="before"
          widget="dxButton"
        />

        <DxItem
          locateInMenu="auto"
          :visible="tollbarItemVisible"
          :options="btnInformedOptions"
          location="before"
          widget="dxButton"
        />

        <DxItem
          locateInMenu="auto"
          :visible="tollbarItemVisible"
          :options="btnAddResolutionOptions"
          location="before"
          widget="dxButton"
        />
      </DxToolbar>
    </div>
  </div>
</template>
<script>
import { confirm } from "devextreme/ui/dialog";
import returnManagersAssistantIcon from "~/static/icons/status/forrework.svg";
import forwardIcon from "~/static/icons/status/forward.svg";
import informedIcon from "~/static/icons/status/explored.svg";
import resolutionIcon from "~/static/icons/addResolution.svg";
import ReviewResult from "~/infrastructure/constants/assignmentResult.js";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
export default {
  components: {
    DxToolbar,
    DxItem
  },
  props: ["assignmentId"],
  data() {
    return {
      result: null
    };
  },
  computed: {
    assignment() {
      return this.$store.getters[`assignments/${this.assignmentId}/assignment`];
    },
    inProcess() {
      return this.$store.getters[`assignments/${this.assignmentId}/inProcess`];
    },
    btnForwardDisabled() {
      return !this.assignment.addresseeId;
    },
    tollbarItemVisible() {
      return this.assignment.addresseeId ? false : this.inProcess;
    },
    isRework() {
      if (this.inProcess) return this.assignment.isRework;
      else return true;
    },
    btnForExecutionOptions() {
      return {
        icon: resolutionIcon,
        text: this.$t("buttons.approveResolution"),
        onClick: () => {
          this.sendResult(ReviewResult.ReviewDraftResolution.ForExecution);
          this.completeAssignment();
        }
      };
    },

    btnInformedOptions() {
      return {
        icon: informedIcon,
        text: this.$t("buttons.takeInto"),
        onClick: async () => {
          this.sendResult(ReviewResult.ReviewDraftResolution.Informed);
          let response = await confirm(
            this.$t("assignment.takeIntoMessage"),
            this.$t("shared.confirm")
          );
          if (response) this.completeAssignment();
        }
      };
    },
    btnAddResolutionOptions() {
      return {
        icon: returnManagersAssistantIcon,
        text: this.$("buttons.returnManagersAssistant"),
        onClick: async () => {
          this.sendResult(ReviewResult.ReviewDraftResolution.AddResolution);
          let response = await confirm(
            this.$t("assignment.returnManagersAssistantMessage"),
            this.$t("shared.confirm")
          );
          if (response) this.completeAssignment();
        }
      };
    },
    btnForwardOptions() {
      return {
        icon: forwardIcon,
        text: this.$t("buttons.readdress"),
        onClick: () => {
          this.sendResult(ReviewResult.ReviewDraftResolution.Forward);
          this.completeAssignment();
        }
      };
    },
    btnAddExecutionOptions() {
      return {
        icon: actionItemExecutionIcon,
        text: this.$t("buttons.createExecution"),
        onClick: async () => {
          const { taskId } = await createActionItemExicutionTask(
            this,
            this.assignmentId
          );
          this.actionItemExecutionTaskId = taskId;
          this.showItemExecutionTask = true;
        }
      };
    }
  },
  methods: {
    sendResult(result) {
      this.$store.commit(
        `assignments/${this.assignmentId}/SET_RESULT`,
        payload
      );
    },
    completeAssignment() {
      this.$awn.asyncBlock(
        this.$store.dispatch(`assignments/${this.assignmentId}/complete`),
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