<template>
  <div id="chat_room">
    <ChatHeader :room="currentRoom" />
    <div class="chat_room_messages">
      <DxLoadIndicator v-if="needLoading" class="loadIndicator" height="75px" width="75px" />
      <ChatMessage
        ref="message"
        v-else
        v-for="(msg,index) in messages"
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
import ChatTextArea from "~/components/chat/chat-text-area.vue";
import ChatHeader from "~/components/chat/components/chat-room/chat-header.vue";
import ChatMessage from "~/components/chat/components/chat-messages/index.vue";
import { DxLoadIndicator } from "devextreme-vue/load-indicator";
import moment from "moment";

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
      return this.$store.getters["chatStore/currentRoomMessages"];
    }
  },
  watch: {
    currentRoom(val) {
      // console.log(val);
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
    loadMessage() {
      setTimeout(() => {
        this.$store.commit("chatStore/SET_MESSAGES", {
          id: 2,
          messages: [
            {
              text: "Твари твари",
              id: "321234",
              author: {
                id: 21,
                jobTitle: "Секретарь",
                name: "Kent Klark Supermenovich",
                avatar: null
              }
            }
          ]
        });
      }, 3000);
    },
    showLastMessage(behaviorOptions = "smooth") {
      setTimeout(() => {
        let el = this.$refs.message[this.$refs.message.length - 1].$el;
        el.scrollIntoView({ behavior: behaviorOptions });
        el.click();
      }, 0);
    },
    sendMessage(value) {
      this.showLastMessage();
      this.$chat.sendMessage({
        text: value,
        roomId: this.currentRoom.id
      });
      this.$chat.readMessagesInRoom(this.currentRoom.id);
    }
  },
  created() {
    this.checkMessage();
    if (this.messages) this.showLastMessage("auto");
  }
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";

#chat_room {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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
    padding: 0 10px !important;
    margin: 0 !important;
  }
  .chat_room_text_area {
    padding: 5px 10px 10px 10px;
  }
}
</style>
