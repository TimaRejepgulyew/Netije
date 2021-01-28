<template>
  <auto-text
    v-if="inProcess && canUpdate"
    :value="value"
    :options="autoComleteOptions"
    @valueChanged="onValueChanged"
  />
</template>

<script>
import assignmentComment from "~/components/workFlow/assignment-module/infrastructure/mixins/assignmentComment.js";
export default {
  mixins: [assignmentComment],
  data() {
    return {
      placeholder: this.$t("assignment.body.reviewManagerAssignment"),
      isRequired: false
    };
  },
  computed: {
    autoComleteOptions() {
      return {
        category: "Assignment",
        entityType: this.assignment.assignmentType,
        placeholder: this.placeholder,
        height: this.height,
        maxLength: this.maxLength,
        validationGroup: this.assignmentValidatorName,
        isRequired: this.isRequired,
        requiredMessage: this.placeholder
      };
    }
  }
};
</script>


