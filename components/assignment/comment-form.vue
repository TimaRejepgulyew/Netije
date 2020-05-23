<template>
  <div>
    <DxTextArea
      :placeholder="placeholder"
      :on-value-changed="setComment"
      :height="150"
      :value="comment"
    >
      <DxValidator ref="textArea">
        <DxRequiredRule :message="$t('translations.fields.commentRequired')" />
      </DxValidator>
    </DxTextArea>
    <div class="btn-group">
      <DxButton icon="check" :text="$t('buttons.send')" :on-click="sendRequest" />
      <DxButton icon="close" :text="$t('buttons.cancel')" :on-click="tooglePopup" />
    </div>
  </div>
</template>

<script>
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import AssignmentType from "~/infrastructure/constants/assignmentType.js";
import { DxButton } from "devextreme-vue";
import { DxTextArea } from "devextreme-vue";
export default {
  components: {
    DxRequiredRule,
    DxValidator,
    DxButton,
    DxTextArea
  },
  data() {
    return {
      comment: null
    };
  },
  methods: {
    tooglePopup() {
      this.$emit("tooglePopup");
    },

    sendRequest() {
      if (this.checkisValid) {
        this.$emit("sendRequest");
      }
    },
    setComment(e) {
      this.$store.commit("currentAssignment/SET_COMMENT", e.value);
    }
  },
  computed: {
    checkisValid() {
      if (
        this.$store.getters["currentAssignment/isActionItemExicutionAssignment"]
      ) {
        const res = this.$refs["textArea"].instance.validate();
        return res.isValid;
      } else {
        return true;
      }
    },
    placeholder() {
      switch (this.$store.getters["currentAssignment/assignmentType"]) {
        case AssignmentType.AcquaintanceFinishAssignment:
        case AssignmentType.SimpleAssignment:
        case AssignmentType.ActionItemSupervisorAssignment:
        case AssignmentType.ReviewAssignment:
        case AssignmentType.AcquaintanceAssignment:
          return this.$t("assignment.placeholderSimple");
        case AssignmentType.ActionItemExecutionAssignment:
          return this.$t("assignment.placeholderActionItemExicution");
      }
    }
  }
};
</script>

<style>
.btn-group {
  padding: 10px 0;
}
</style>