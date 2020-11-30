<template>
  <div>
    <DxButton :icon="icon" :on-click="showPopup" :hint="$t('shared.access')" />
  </div>
</template>

<script>
import { DxButton } from "devextreme-vue";
import icon from "~/static/icons/access-right.svg";
export default {
  components: {
    DxButton,
  },

  props: ["entityType", "entityId"],
  data() {
    return {
      icon,
    };
  },
  methods: {
    showPopup() {
      this.$popup.accessRight(
        this,
        {
          entityType: this.entityType,
          entityId: this.entityId,
        },
        {
          position: "flex-start",
          width: "60%",
          height: "auto",
          listeners: [
            { eventName: "valueChanged", handlerName: "valueChanged" },
          ],
        }
      );
    },
  },
};
</script>

<style>
</style>