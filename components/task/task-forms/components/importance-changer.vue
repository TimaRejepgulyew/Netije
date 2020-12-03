<template>
  <DxButtonGroup
    :read-only="readOnly"
    :selected-item-keys="[importance]"
    :items="compoundBtn"
    key-expr="filterKey"
    @item-click="setImportance"
  />
</template>
<script>
import fireIcon from "~/static/icons/fire.png";
import Important from "~/infrastructure/constants/assignmentImportance.js";
import { DxButtonGroup } from "devextreme-vue";
export default {
  components: {
    DxButtonGroup,
    fireIcon,
  },
  props: ["readOnly", "taskId"],
  computed: {
    compoundBtn() {
      return [
        {
          icon: fireIcon,
          text: this.$t("task.importance.highImportance"),
          filterKey: true,
        },
      ];
    },
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
        !this.importance ? Important.High : Important.Normal
      );
    },
  },
};
</script>