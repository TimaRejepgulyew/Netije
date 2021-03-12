<template>
  <div id="chat_search_panel">
    <div class="text_box">
      <DxTextBox
        :buttons="searchPanelButtons"
        @value-changed="valueChanged"
        @focus-in="focusIn"
        :value.sync="searchValue"
        stylingMode="underlined"
      />
    </div>
    <DxDropDownButton
      icon="rename"
      stylingMode="text"
      :showArrowIcon="false"
      :focusStateEnabled="false"
      :items="items"
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
  data() {
    return {
      searchValue: ""
    };
  },
  computed: {
    items() {
      return [
        {
          text: "Создать чат",
          roomType: RoomType.Private,
          onClick: e => this.createRoom(e.itemData.roomType)
        },
        {
          text: "Создать груповой чат",
          roomType: RoomType.Group,
          onClick: e => this.createRoom(e.itemData.roomType)
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
            hoverStateEnabled: false
          }
        }
      ];
    }
  },
  methods: {
    focusIn() {
      this.$emit("inFocus");
      console.log("focus in");
    },
    createRoom(roomType) {
      this.$emit("createRoom", roomType);
    },
    valueChanged(e) {
      console.log(e);
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