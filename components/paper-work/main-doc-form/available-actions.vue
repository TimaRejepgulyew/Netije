<template>
  <DxDropDownButton
    @button-click="createSimpleTask"
    :use-select-mode="false"
    :split-button="true"
    :hint="$t('buttons.createTaskByDocument')"
    :drop-down-options="{ width: 330 }"
    :items="items"
    :icon="sendIcon"
    display-expr="name"
    @item-click="createTask"
  />
</template>
<script>
import sendIcon from "~/static/icons/send.svg";
import ActionGuid from "~/infrastructure/constants/actionGuid.js";
import { DxDropDownButton } from "devextreme-vue";
export default {
  components: {
    DxDropDownButton
  },
  data() {
    return {
      sendIcon
    };
  },
  computed: {
    items() {
      const allActionGuid = ActionGuid(this);
      const availableActions = this.$store.getters["currentDocument/document"]
        .documentKind.availableActions;
      return allActionGuid.filter(el => {
        let isSimilar = false;
        for (let id in availableActions) {
          if (availableActions[id] === el.id) isSimilar = true;
        }
        return isSimilar;
      });
    }
  },
  methods: {
    createTask(e) {
      this.$router.push(e.itemData.path);
    },
    createSimpleTask() {
      this.$router.push({
        path: "/task/simple/create",
        query: {
          documentId: this.$store.getters["currentDocument/document"].id
        }
      });
    }
  }
};
</script>

<style>
</style>