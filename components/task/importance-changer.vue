<template>
  <div class="navBar">
    <DxCheckBox v-model="importance" :text="$t('translations.fields.hightImportance')" />
  </div>
</template>
<script>
import Important from "~/infrastructure/constants/assignmentImportance.js";
import { DxCheckBox } from "devextreme-vue/check-box";
export default {
  components: {
    DxCheckBox
  },
  data() {
    return {
      importance: false
    };
  },
  watch: {
    importance: function(value) {
      this.$emit(
        "importanceChanged",
        value ? Important.Hight : Important.Normal
      );
    }
  }
};
</script>