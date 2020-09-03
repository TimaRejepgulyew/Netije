<template>
  <DxTextArea
    :placeholder="placeholder"
    :height="height"
    :max-length="maxLength"
    :value.sync="value"
    @valueChanged="onValueChanged"
  >
    <DxValidator v-if="isRequired" :validationGroup="assignmentValidatorName">
      <DxRequiredRule :message="$t('assignment.validation.bodyRequired')" />
    </DxValidator>
  </DxTextArea>
</template>

<script>
import bodyMixin from "./bodyMixin.js";

export default {
  mixins: [bodyMixin],
  data() {
    return {
      placeholder: this.$t("assignment.body.simpleAssignment"),
      isRequired: false,
    };
  },
};
</script>


