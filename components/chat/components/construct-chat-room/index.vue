<template>
  <div id="constructor_chat_room">
    <ConstructorChatRoomHeader />
    <div class="chat_room_messages">
      <h3>Групповой чат</h3>
      <p>Закрытый чат виден только приглашенным пользователям.</p>
      <p>В чате можно обсуждать рабочие вопросы, которые касаются конкретных людей.</p>
    </div>
  </div>
</template>

<script>
import customSelectItem from "~/components/employee/custom-select-box-item.vue";
import ChatTextArea from "~/components/chat/chat-text-area.vue";
import ConstructorChatRoomHeader from "~/components/chat/components/construct-chat-room/constructor-chat-room-header.vue";
import { DxLoadIndicator } from "devextreme-vue/load-indicator";
import moment from "moment";

export default {
  components: {
    customSelectItem,
    ChatTextArea,
    DxLoadIndicator,
    ConstructorChatRoomHeader
  }
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
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
}
</style>
