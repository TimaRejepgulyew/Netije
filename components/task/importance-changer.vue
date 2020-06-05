<template>
  <div class="navBar">
    <DxCheckBox
      :onValueChanged="setImportance"
      :value="importance"
      :text="$t('translations.fields.highImportance')"
    />
  </div>
</template>
<script>
import Important from "~/infrastructure/constants/assignmentImportance.js";
import { DxCheckBox } from "devextreme-vue/check-box";
export default {
  components: {
    DxCheckBox
  },

  computed: {
    importance() {
      return this.$store.getters["currentTask/task"].importance ===
        Important.Normal
        ? false
        : true;
    }
  },
  methods: {
    setImportance(e) {
      console.log(e.value);
      this.$store.commit(
        "currentTask/SET_IMPORTANCE",
        e.value ? Important.High : Important.Normal
      );
    }
  }
};
</script>