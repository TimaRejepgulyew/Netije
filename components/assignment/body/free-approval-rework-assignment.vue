<template>
  <div>
    <div class="d-flex align-center">
      <label class="control__label align-content-center" for="newDeadLine">{{
        $t("assignment.fields.newDeadline")
      }}</label>
      <div class="f-grow-1">
        <DxDateBox
          :readOnly="!inProcess || !canUpdate"
          :useMaskBehavior="true"
          :openOnFieldClick="true"
          type="datetime"
          name="newDeadLine"
          :min="new Date().getTime()"
          :value.sync="newDeadline"
          @valueChanged="newDeadlineChanged"
          styling-mode="outlined"
        ></DxDateBox>
      </div>
    </div>
    <DxTextArea
      v-if="inProcess && canUpdate"
      :placeholder="placeholder"
      :height="height"
      :max-length="maxLength"
      :value.sync="value"
      @valueChanged="onValueChanged"
    >
      <DxValidator v-if="isRequired" :validationGroup="assignmentValidatorName">
        <DxRequiredRule :message="placeholder" />
      </DxValidator>
    </DxTextArea>
  </div>
</template>

<script>
import bodyMixin from "./bodyMixin.js";
import {
  DxDateBox,
  DxButton as DxDateBoxButton
} from "devextreme-vue/date-box";
export default {
  mixins: [bodyMixin],
  components: {
    DxDateBox
  },
  data() {
    return {
      newDeadline: this.$store.getters[
        `assignments/${this.assignmentId}/assignment`
      ].newDeadline,
      // validationmMesssage: this.$t(
      //   "assignment.validation.acquaintanceAssignmentRequired"
      // ),
      placeholder: this.$t("assignment.body.freeApprovalAssignment"),
      isRequired: false
    };
  },
  methods: {
    newDeadlineChanged(e) {
      this.$store.commit(
        `assignments/${this.assignmentId}/SET_NEW_DEADLINE`,
        e.value
      );
    }
  }
};
</script>
<style lang="scss">
.control__label {
  display: block;
  padding: 15px 15px;
}
</style>
