<template>
  <DxTextArea
    :placeholder="placeholder"
    :height="height"
    :max-length="maxLength"
    :value.sync="value"
    :onChange="onValueChanged"
  >
    <DxValidator>
      <DxRequiredRule
        :isRequired="isRequired"
        :validationGroup="validationGroup"
        :message="$t('assignment.validation.bodyRequired')"
      />
    </DxValidator>
  </DxTextArea>
</template>

<script>
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import DxTextArea from "devextreme-vue/text-area";
export default {
  components: {
    DxValidator,
    DxRequiredRule,
    DxTextArea,
  },
  props: ["value", "validationGroup"],
  data() {
    return {
      placeholder: $("assignment.body.simpleAssignmentPlaceholder"),
      height: 90,
      maxLength: 271,
      isRequired: false,
    };
  },
  methods: {
    onValueChanged(e) {
      console.log(e.value);
      this.$emit("onValueChanged", e.value);
    },
  },
};
</script>


