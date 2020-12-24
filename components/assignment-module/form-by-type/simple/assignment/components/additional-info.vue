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
import additionalInfo from "../../../../infrastructure/mixins/additionalnfo.js";

export default {
  mixins: [additionalInfo],
  data() {
    return {
      placeholder: this.$t("assignment.body.simpleAssignment"),
      isRequired: false,
    };
  },
};
</script>


