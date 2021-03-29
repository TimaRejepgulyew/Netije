<template>
  <div id="chat_search_panel">
    <div class="text_box">
      <DxTextBox
        ref="searchTextBox"
        stylingMode="underlined"
        valueChangeEvent="input"
        :buttons="searchPanelButtons"
        @value-changed="valueChanged"
        @focus-in="focusIn(true)"
      />
    </div>
    <DxDropDownButton
      icon="rename"
      stylingMode="text"
      :showArrowIcon="false"
      :focusStateEnabled="false"
      :items="dropDownButtonItems"
      displayExpr="text"
      valueExpr="roomType"
      :drop-down-options="{ width: 200 }"
    />
  </div>
</template>


<script>
import DxTextBox from "devextreme-vue/text-box";
import DxDropDownButton from "devextreme-vue/drop-down-button";
import RoomType from "~/components/chat/infrastructure/constants/roomType.js";
export default {
  components: {
    DxTextBox,
    DxDropDownButton
  },
  computed: {
    dropDownButtonItems() {
      return [
        {
          text: this.$t("chatInterface.createChat"),
          roomType: RoomType.Private,
          onClick: e => this.openRoomConstructor(e.itemData.roomType)
        },
        {
          text: this.$t("chatInterface.createGroupChat"),
          roomType: RoomType.Group,
          onClick: e => this.openRoomConstructor(e.itemData.roomType)
        }
      ];
    },
    searchPanelButtons() {
      return [
        {
          location: "before",
          name: "search",
          options: {
            icon: "search",
            activeStateEnabled: false,
            focusStateEnabled: false,
            hoverStateEnabled: false,
            onClick: () => {
              this.$refs["searchTextBox"].instance.focus();
            }
          }
        }
      ];
    }
  },
  methods: {
    focusIn(value) {
      this.$emit("inFocus", value);
    },
    openRoomConstructor(roomType) {
      this.$emit("openRoomConstructor", roomType);
    },
    valueChanged(e) {
      this.$emit("valueChanged", e.value.trim());
    }
  }
};
</script>

<style lang="scss">
#chat_search_panel {
  padding: 0 0 5px 0;
  display: flex;
  align-items: center;
  .text_box {
    flex-grow: 1;
  }
}
</style>