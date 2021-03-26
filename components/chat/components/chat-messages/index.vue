<template>
  <div
    class="message_wrapper"
    :class="{ user_message: isOwnMessage(message.author.id) }"
  >
    <div class="avatar">
      <roomIcon :room="message.author" />
    </div>
    <div class="message">
      <div class="text">{{ message.text }}</div>
      <div class="time" v-if="message.created">
        {{ formatDate(message.created) }}
      </div>
    </div>
  </div>
</template>


<script>
import roomIcon from "~/components/chat/components/room-icon.vue";
import moment from "moment";

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
      return this.$store.getters["user/employeeId"] == authorId ? true : false;
    },
    formatDate(value) {
      return moment(value).format("MM.DD.YYYY HH:mm");
    }
  },
  created() {
    // console.log(this.message);
  }
};
</script>

<style lang="scss">
.message_wrapper {
  display: flex;
  justify-content: flex-start;
  margin: 10px;
  &.user_message {
    justify-content: flex-end;
    .message {
      order: -1;
      color: #fff;
      background-color: $base-accent;
      border-radius: 10px 0 10px 10px;
    }
  }
  .message {
    padding: 5px 10px;
    margin: 0 10px;
    border: 1px solid $base-border-color;
    max-width: 60%;
    background-color: #fff;
    border-radius: 0 10px 10px 10px;
    .text {
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