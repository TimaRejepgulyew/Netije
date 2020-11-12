<template>
  <DxButtonGroup
    :selected-item-keys="[isCompoundActionItem]"
    :items="compoundBtn"
    key-expr="filterKey"
    @item-click="itemClick"
  />
</template>

<script>
import switchToCompoundBtn from "~/static/icons/switch-to-compound.svg"
import { DxButtonGroup } from "devextreme-vue";
export default {
  components: {
    DxButtonGroup,switchToCompoundBtn
  },
  props: ["taskId"],
  data() {
    return {
      compoundBtn: [
        {
          icon:switchToCompoundBtn,
          text: this.$t("buttons.switchToCompound"),
          filterKey: true,
          hint: this.$t("buttons.switchToCompound"),
        },
       
      ],
    };
  },
  computed:{
      isCompoundActionItem (){
          return this.$store.getters[`tasks/${this.taskId}/task`].isCompoundActionItem 
      }
  },
  methods: {
    itemClick() {
        this.$store.commit(`tasks/${this.taskId}/SWITCH_TO_COMPOUND_ACTION_ITEM`,!this.isCompoundActionItem)
        console.log("sadwa");
    },
  },
};
</script>

<style>