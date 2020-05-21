<template>
  <DxDropDownButton
    :use-select-mode="false"
    :text="$t('buttons.create')"
    :drop-down-options="{ width: 230 }"
    :items="creaTaskItems"
    display-expr="text"
    @item-click="createTask"
  />
</template>

<script>
import { TaskButtons } from "~/infrastructure/constants/creatingItems.js";
import { DxDropDownButton } from "devextreme-vue";
export default {
  components: {
    DxDropDownButton
  },
  data() {
    return {
      creaTaskItems: TaskButtons(this)
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