<template>
  <div class="navBar">
    <DxCheckBox
      :read-only="readOnly"
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
  props: ["readOnly"],
  created() {
    console.log(this.readOnly);
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
      this.$store.commit(
        "currentTask/SET_IMPORTANCE",
        e.value ? Important.High : Important.Normal
      );
    }
  }
};
</script>