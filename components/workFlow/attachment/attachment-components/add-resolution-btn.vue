<template>
  <DxMenu
    :adaptivityEnabled="true"
    :data-source="subMenu"
    show-first-submenu-mode="onHover"
    orientation="vertical"
    submenu-direction="auto"
    :hide-submenu-on-mouse-leave="true"
    display-expr="text"
    @item-click="itemClick"
  />
</template>

<script>
import TaskType from "../../infrastructure/models/TaskType.js";
import DxMenu from "devextreme-vue/menu";
export default {
  components: {
    DxMenu,
  },
  computed: {
    subMenu() {
      return [
        {
          icon: "plus",
          items: Object.values(new TaskType(this).getResolutionTask()),
        },
      ];
    },
  },
  methods: {
    itemClick({ itemData }) {
      this.$emit("createTask", {
        taskType: itemData.id,
      });
    },
  },
};
</script>
