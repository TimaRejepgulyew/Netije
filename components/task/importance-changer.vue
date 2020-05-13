<template>
  <div class="navBar">
    <DxCheckBox v-model="importance" :text="$t('translations.fields.highImportance')" />
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
      this.$emit("importantChanged", value ? Important.High : Important.Normal);
    }
  }
};
</script>