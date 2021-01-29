<template>
  <DxToolbar class="toolbar">
    <DxItem :options="saveButtonOptions" location="before" widget="dxButton" />
    <DxItem :options="exchangeOptions" location="before" widget="dxButton" />
    <DxItem
      template="toolbarItemCreateVersion"
      locateInMenu="auto"
      :visible="!isNew"
      location="after"
    />
    <template #toolbarItemCreateVersion>
      <toolbarItemAccessRight :entityId="entityId" :entityType="entityType" />
    </template>
  </DxToolbar>
</template>
<script>
import { DxButtonItem } from "devextreme-vue/form";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import EntityType from "~/infrastructure/constants/entityTypes";
import toolbarItemAccessRight from "~/components/access-right/entity-access-right/access-right.vue";
export default {
  components: {
    DxToolbar,
    DxItem,
    toolbarItemAccessRight
  },
  props: ["canSave", "canExchange", "isCard", "entityId", "isNew"],
  data() {
    return {
      entityType: EntityType.ParticipantList
    };
  },
  computed: {
    saveButtonOptions() {
      return {
        icon: "save",
        type: "success",
        visible: this.canSave,
        useSubmitBehavior: true,
        onClick: e => {
          this.$emit("saveChanges");
        }
      };
    },
    exchangeOptions() {
      return {
        icon: "preferences",
        visible: this.canExchange,
        hint: this.$t("exchange.exchangeOptions"),
        useSubmitBehavior: true,
        onClick: e => {
          this.$emit("openExchangeOptions");
        }
      };
    }
  }
};
</script>
<style scoped>
.toolbar {
  background-color: transparent;
  margin-bottom: 10px;
}
</style>