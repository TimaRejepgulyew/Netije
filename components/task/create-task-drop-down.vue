<template>
  <DxDropDownButton
    :use-select-mode="false"
    :text="$t('buttons.create')"
    :drop-down-options="{ width: 230 }"
    :items="assignmentsTypes"
    icon="plus"
    display-expr="name"
    @item-click="createTask"
  />
</template>

<script>
import { DxDropDownButton } from "devextreme-vue";
export default {
  components: {
    DxDropDownButton
  },
  data() {
    return {
      assignmentsTypes: [
        {
          path: "/task/simple/create",
          name: this.$t("translations.fields.createSimpleTask")
        },
        {
          path: "/task/acquaintance/create",
          name: this.$t("translations.fields.createAcquaintanceTask")
        },
        {
          path: "/task/action-item-execution/create",
          name: this.$t("translations.fields.createActionTask")
        }
      ]
    };
  },
  methods: {
    createTask(e) {
      this.$router.push(e.itemData.path);
    }
  }
};
</script>

<style>
</style>