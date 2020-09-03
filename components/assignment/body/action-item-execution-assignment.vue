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
      // validationMessage: $t("assignment.validation.actionItemRequired"),
      placeholder: this.$t("assignment.body.actionAtiemExecution"),
      isRequired: true,
    };
  },
};
</script>
