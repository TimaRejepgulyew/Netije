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
    DxCheckBox,
  },
  props: ["readOnly", "taskId"],
  created() {
  },
  computed: {
    importance() {
      return this.$store.getters[`tasks/${this.taskId}/task`]?.importance ===
        Important.Normal
        ? false
        : true;
    },
  },
  methods: {
    setImportance(e) {
      this.$store.commit(
        `tasks/${this.taskId}/SET_IMPORTANCE`,
        e.value ? Important.High : Important.Normal
      );
    },
  },
};
</script>