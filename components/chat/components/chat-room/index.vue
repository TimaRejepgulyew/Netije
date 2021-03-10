<template>
  <div id="chat_room">
    <ChatHeader :room="currentRoom" />
    <div class="chat_room_messages">
      <div class="loadIndicator" v-if="needLoading">
        <DxLoadIndicator height="75px" width="75px" />
      </div>
      <div
        v-else
        class="messages"
        :class="{ user_message:isOwnMessage( message.author) }"
        v-for="(message, index) in messages"
        ref="message"
        :key="index"
      >
        <div class="message">{{ message.text }}</div>
        <div class="time" v-if="message.time">{{ formatDate(message.time ) }}</div>
      </div>
    </div>
    <div class="chat_room_text_area">
      <ChatTextArea @sendMessage="sendMessage" />
    </div>
  </div>
</template>

<script>
import customSelectItem from "~/components/employee/custom-select-box-item.vue";
import ChatTextArea from "~/components/chat/chat-text-area.vue";
import ChatHeader from "~/components/chat/components/chat-room/chat-header.vue";
import { DxLoadIndicator } from "devextreme-vue/load-indicator";
import moment from "moment";

export default {
  components: {
    customSelectItem,
    ChatTextArea,
    DxLoadIndicator,
    ChatHeader
  },
  computed: {
    needLoading() {
      return this.$store.getters["chatStore/needLoading"];
    },
    currentRoom() {
      return this.$store.getters["chatStore/currentRoom"];
    },
    messages() {
      return this.$store.getters["chatStore/currentRoomMessages"];
    }
  },
  watch: {
    currentRoom(val) {
      this.$chat.messagesByRoomId(val.id);
    },
    messages(val) {
      this.showLastMessage();
    }
  },
  methods: {
    formatDate(value) {
      return moment(value).format("MM.DD.YYYY HH:mm");
    },
    isOwnMessage(authorId) {
      let a = this.$store.getters["chatStore/userId"];
      return 1 == authorId ? true : false;
    },
    showLastMessage() {
      setTimeout(() => {
        let el = this.$refs.message[this.$refs.message.length - 1];
        el.scrollIntoView({ behavior: "smooth" });
        el.click();
      }, 0);
    },
    sendMessage(value) {
      console.log(this.$store.getters["chatStore/userId"]);
      this.$chat.sendMessage({
        text: value,
        roomId: this.currentRoom.id
      });
    }
  }
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";

#chat_room {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 60px 1fr 150px;
  .loadIndicator {
    position: absolute;
    width: 75px;
    height: 75px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .chat_room_messages {
    position: relative;
    background-color: rgba(215, 221, 230, 0.5);
    display: flex;
    flex-direction: column;
    overflow-y: scroll;

    padding: 0 0 0 0 !important;
    margin: 0 !important;
    .messages {
      padding: 5px 10px;
      margin: 10px;
      border: 1px solid $base-border-color;
      align-self: flex-start;
      max-width: 60%;
      background-color: #fff;
      border-radius: 10px 10px 10px 0;
      &.user_message {
        align-self: flex-end;
        background-color: $base-accent;
        border-radius: 10px 10px 0 10px;
        color: #fff;
        // align-self: end;
      }
      .message {
        font-size: 16px;
      }
      .time {
        font-size: 12px;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
  .chat_room_text_area {
    padding: 5px 10px 10px 10px;
  }
}
</style>
