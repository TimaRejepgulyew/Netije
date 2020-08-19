<template>
  <DxDropDownButton
    styling-mode="text"
    icon="overflow"
    :showArrowIcon="false"
    :drop-down-options="{ width: 230 }"
    :items="btnType"
    display-expr="name"
    @item-click="onItemClick"
  />
</template>
<script>
import cardIcon from "~/static/icons/card.svg";
import DocumentService from "~/infrastructure/services/documentVersionService";
import { DxDropDownButton } from "devextreme-vue";
import dataApi from "~/static/dataApi";
export default {
  components: {
    DxDropDownButton
  },
  props: ["attachment"],
  data() {

    return {
      btnType: [
        {
          type: "detach",
          visible: this.attachment.canDetach,
          icon: "trash",
          name: this.$t("buttons.deleteLink")
        },
        {
          type: "card",
          icon: cardIcon,
          name: this.$t("buttons.showCard")
        }
      ]
    };
  },
  computed: {},
  methods: {
    showCard() {
      this.$emit("showCard");
    },
    onItemClick(e) {
      switch (e.itemData.type) {
        case "detach":
          this.detachLink();
          break;
        case "card":
          this.showCard();
          break;
      }
    },
    detachLink() {
      this.$emit("detach", this.attachment.attachmentId);
    },
   
  }
};
</script>