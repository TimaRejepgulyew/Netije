<template>
  <div id="chat_room">
    <div class="chat_room_header">
      <div class="user_info">
        <customSelectItem :item-data="dat" />
      </div>
    </div>
    <div class="chat_room_messages">
      <div
        class="messages"
        :class="{ user_message: message.me }"
        v-for="(message, index) in messages"
        ref="message"
        :key="index"
      >
        <div class="message">{{ message.message }}</div>
        <div class="time" v-if="message.time">{{ message.time | formatDate }}</div>
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
import moment from "moment";

export default {
  components: {
    customSelectItem,
    ChatTextArea
  },
  data() {
    return {
      dat: {
        businessUnitId: 38,
        dateOfAppointment: null,
        dateOfDismissal: null,
        departmentId: 39,
        description: "Секретарь",
        email: null,
        id: 41,
        isSystem: false,
        jobTitle: "Секретарь",
        jobTitleId: 2,
        name: "3 User",
        note: null,
        personId: 38,
        personalPhotoHash: null,
        phone: null,
        recipientType: 4,
        status: 0,
        userName: "User3"
      },
      messages: [
        {
          me: true,
          message: "Hello",
          time: new Date()
        },
        {
          me: false,
          message: "Дратути",
          time: new Date()
        },
        {
          me: true,
          message: "Рамзамзам"
        },
        {
          me: false,
          message: "Локопоко"
        },
        {
          me: true,
          message: "Hello"
        },
        {
          me: false,
          message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          time: new Date()
        },
        {
          me: true,
          message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          time: new Date()
        },
        {
          me: false,
          message: "Локопоко"
        },
        {
          me: true,
          message: "Hello"
        },
        {
          me: false,
          message: "Дратути"
        },
        {
          me: true,
          message: "Рамзамзам"
        },
        {
          me: false,
          message: "Локопоко"
        },
        {
          me: true,
          message: "Hello"
        },
        {
          me: false,
          message: "Дратути"
        },
        {
          me: true,
          message: "Рамзамзам"
        },
        {
          me: false,
          message: "Локопоко"
        },
        {
          me: true,
          message: "Hello"
        },
        {
          me: false,
          message: "Дратути"
        },
        {
          me: true,
          message: "Рамзамзам"
        },
        {
          me: false,
          message: "Локопоко"
        },
        {
          me: true,
          message: "Hello"
        },
        {
          me: false,
          message: "Дратути"
        },
        {
          me: true,
          message: "Рамзамзам"
        },
        {
          me: false,
          message: "Локопоко"
        },
        {
          me: true,
          message: "Hello"
        },
        {
          me: false,
          message: "Дратути"
        },
        {
          me: true,
          message: "Рамзамзам"
        },
        {
          me: false,
          message: "Локопоко"
        }
      ]
    };
  },
  watch: {
    messages(val) {
      this.showLastMessage();
    }
  },
  filters: {
    formatDate(value) {
      return moment(value).format("MM.DD.YYYY HH:mm");
    }
  },
  methods: {
    showLastMessage() {
      setTimeout(() => {
        let el = this.$refs.message[this.$refs.message.length - 1];
        el.scrollIntoView({ behavior: "smooth" });
        el.click();
      }, 0);
    },
    sendMessage(value) {
      this.messages.push({
        me: true,
        message: value,
        time: new Date()
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
  .chat_room_header {
    padding: 5px 0 0 20px;
    .user_info {
      display: inline-block;
      transform: scale(1.2);
    }
  }
  .chat_room_messages {
    background-color: rgba(215, 221, 230, 0.5);
    display: flex;
    flex-direction: column;
    overflow-y: scroll;

    padding: 0 0 0 0 !important;
    margin: 0 !important;
    .messages {
      padding: 5px 10px;
      margin: 10px;
      font-family: "Helvetica Neue", "Segoe UI", Helvetica, Verdana, sans-serif;
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
