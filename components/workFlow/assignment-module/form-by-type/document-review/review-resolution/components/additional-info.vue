<template>
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
</template>

<script>
import assignmentComment from "../../../../infrastructure/mixins/assignmentComment.js";

export default {
  mixins: [assignmentComment],
  data() {
    return {
      placeholder: this.$t("assignment.body.reviewResolutionAssignment"),
      isRequired: false,
    };
  },
};
</script>


