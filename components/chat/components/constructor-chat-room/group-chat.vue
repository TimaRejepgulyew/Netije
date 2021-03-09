<template>
  <div id="constructor_chat_room">
    <div id="constructor_chat_room_header">
      <div class="selector">
        <EmployeeTagBox
          :activeStateEnabled="false"
          :hoverStateEnabled="false"
          :focusStateEnabled="false"
          :stylingMode="'underlined'"
          :height="60"
        />
      </div>
    </div>
    <div class="chat_room_messages">
      <h3>Групповой чат</h3>
      <p>Закрытый чат виден только приглашенным пользователям.</p>
      <p>В чате можно обсуждать рабочие вопросы, которые касаются конкретных людей.</p>
      <h1 class="start_btn" @click="createRoom">Начать чат</h1>
    </div>
  </div>
</template>

<script>
import customSelectItem from "~/components/employee/custom-select-box-item.vue";
import ChatTextArea from "~/components/chat/chat-text-area.vue";
import { DxLoadIndicator } from "devextreme-vue/load-indicator";
import moment from "moment";
import RoomType from "~/components/chat/infrastructure/constants/roomType.js";
import EmployeeTagBox from "~/components/employee/custom-tag-box.vue";

export default {
  components: {
    customSelectItem,
    ChatTextArea,
    DxLoadIndicator,
    EmployeeTagBox
  },
  props: {
    roomType: {
      type: Number
    }
  },
  methods: {
    createRoom() {
      this.$chat.createRoom({
        roomType: 0,
        members: [2]
      });
    }
  },
  created() {
    console.log("this.roomType", this.roomType);
  }
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
#constructor_chat_room_header {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 5px 0 5px;
  .selector {
    flex-grow: 1;
  }
}
#constructor_chat_room {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 60px 1fr;
  .chat_room_messages {
    position: relative;
    background-color: rgba(215, 221, 230, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .start_btn {
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      opacity: 0.5;
    }
  }
}
</style>
