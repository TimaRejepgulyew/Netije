<template>
  <DxTextArea
    v-if="inProcess&& canUpdate"
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
</template>

<script>
import bodyMixin from "./bodyMixin.js";
export default {
  mixins: [bodyMixin],
  data() {
    return {
      // validationmMesssage: this.$t(
      //   "assignment.validation.acquaintanceAssignmentRequired"
      // ),
      placeholder: this.$t("assignment.body.acquaintanceAssignment"),
      isRequired: false,
    };
  },
};
</script>
