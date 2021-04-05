<template>
  <div id="chat_room">
    <ChatHeader :room="currentRoom" />
    <div class="chat_room_messages">
      <button @click="getMessage" class="get-message-btn">
        Загрузить сообщения
      </button>
      <DxLoadIndicator
        v-if="needLoading"
        class="loadIndicator"
        height="75px"
        width="75px"
      />
      <ChatMessage
        ref="message"
        v-else
        v-for="(msg, index) in messages"
        :message="msg"
        :key="index"
      />
    </div>
    <div class="chat_room_text_area">
      <ChatTextArea @sendMessage="sendMessage" />
    </div>
  </div>
</template>

<script>
import ChatTextArea from "~/components/chat/components/chat-text-area.vue";
import ChatHeader from "~/components/chat/components/chat-room/chat-header.vue";
import ChatMessage from "~/components/chat/components/chat-messages/index.vue";
import { DxLoadIndicator } from "devextreme-vue/load-indicator";

export default {
  components: {
    ChatTextArea,
    DxLoadIndicator,
    ChatHeader,
    ChatMessage
  },
  computed: {
    needLoading() {
      return this.$store.getters["chatStore/needLoading"];
    },
    currentRoom() {
      return this.$store.getters["chatStore/currentRoom"];
    },
    messages() {
      console.log(
        "messages",
        this.$store.getters["chatStore/currentRoomMessages"]
      );
      return this.$store.getters["chatStore/currentRoomMessages"];
    },
    unreadMessagesCount() {
      return this.$store.getters["chatStore/currentRoom"].unreadMessageCount;
    }
  },
  watch: {
    currentRoom(val) {
      this.readMessages();
    },
    messages(val) {
      this.showLastMessage();
      this.checkMessage();
    }
  },
  methods: {
    checkMessage() {
      if (this.messages == undefined) {
        this.$store.commit("chatStore/ENABLE_LOAD_PANEL");
        this.loadMessage();
      } else {
        this.$store.commit("chatStore/DISABLE_LOAD_PANEL");
      }
    },
    getMessage() {
      this.loadMessage();
    },
    loadMessage() {
      this.$chat.messagesByRoomId({
        roomId: this.currentRoom.id,
        take: 15,
        skip: this.messages?.length || 0
      });
      this.$store.commit("chatStore/DISABLE_LOAD_PANEL");
    },
    showLastMessage(behaviorOptions = "smooth") {
    //   setTimeout(() => {
    //     let el = this.$refs.message[this.$refs.message.length - 1].$el;
    //     el.scrollIntoView({ behavior: behaviorOptions });
    //     el.click();
    //   }, 0);
    },
    sendMessage(value) {
      this.showLastMessage();
      this.$chat.sendMessage({
        text: value,
        roomId: this.currentRoom.id
      });
    },
    readMessages() {
      if (this.unreadMessagesCount >= 1) {
        this.$chat.readMessagesInRoom(this.currentRoom.id);
      }
    }
  },
  created() {
    this.checkMessage();
    this.readMessages();
    if (this.messages) this.showLastMessage("auto");
  }
};
</script>

<style lang="scss">
#chat_room {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .get-message-btn {
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);

    &:hover {
      background-color: rgba(#ddd, 0.6);
      color: $base-accent;
    }
  }

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
    flex-grow: 1;
    background-color: rgba(215, 221, 230, 0.5);
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    padding: 30px 10px 0 10px !important;
    margin: 0 !important;
  }

  .chat_room_text_area {
    padding: 5px 5px 5px 10px;
  }
}
</style>
