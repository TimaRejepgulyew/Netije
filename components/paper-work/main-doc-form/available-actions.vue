<template>
  <DxDropDownButton
    @button-click="createSimpleTask"
    :use-select-mode="false"
    :split-button="true"
    :text="$t('buttons.create')"
    :drop-down-options="{ width: 230 }"
    :items="items"
    display-expr="name"
    @item-click="createTask"
  />
</template>
<script>
import ActionGuid from "~/infrastructure/constants/actionGuid.js";
import { DxDropDownButton } from "devextreme-vue";
export default {
  components: {
    DxDropDownButton
  },
  computed: {
    items() {
      const allActionGuid = ActionGuid(this);
      let availableActions = this.$store.getters["currentDocument/document"]
        .documentKind.availableActions;
      return allActionGuid.filter(el => {
        // return availableActions.find(id => {
        //   el.id === id;
        // });
      });
    }
  },
  methods: {
    createTask(e) {
      this.$router.push(e.itemData.path);
    },
    createSimpleTask() {
      this.$router.push("/task/simple/create");
    }
  }
};
</script>

<style>
</style>