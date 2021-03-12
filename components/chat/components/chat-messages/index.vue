<template>
  <div class="message_wrapper">
    <div class="avatar">
      <roomIcon :room="message.author" />
    </div>
    <div class="messages" :class="{ user_message:isOwnMessage( message.author) }" >
      <div class="message">{{ message.text }}</div>
      <div class="time" v-if="message.created">{{ formatDate(message.created) }}</div>
    </div>
  </div>
</template>


<script>
import roomIcon from "~/components/chat/components/room-icon.vue";

export default {
  components: {
    roomIcon
  },
  props: {
    message: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    needLoading() {
      return this.$store.getters["chatStore/needLoading"];
    }
  },
  methods: {
    isOwnMessage(authorId) {
      let a = this.$store.getters["chatStore/userId"];
      return 1 == authorId ? true : false;
    },
    formatDate(value) {
      return moment(value).format("MM.DD.YYYY HH:mm");
    }
  }
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
.message_wrapper {
  display: flex;
  align-items: flex-start;
  margin: 10px;
  .messages {
    padding: 5px 10px;
    margin: 0 0 0 10px;
    border: 1px solid $base-border-color;
    align-self: flex-start;
    max-width: 60%;
    background-color: #fff;
    border-radius: 0 10px 10px 10px;
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
</style>