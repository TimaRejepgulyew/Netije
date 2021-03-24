<template>
  <div class="room_info_wrapper">
    <chatIcon :name="room.name" :avatar="room.avatar" />
    <div class="room_information">
      <div class="room_name">
        <span v-if="room.id == currentUser">
          <b>(Это вы)</b>
        </span>
        {{ room.name }}
        <span class="unread_message_count" v-if="room.unreadMessageCount">
          {{ room.unreadMessageCount }}
        </span>
      </div>
      <!-- <div class="room_description" v-if="room.lastMessage.text">{{room.lastMessage.text}}</div> -->
    </div>
  </div>
</template>
<script>
import chatIcon from "~/components/chat/components/chat-icon.vue";

export default {
  components: {
    chatIcon
  },
  props: {
    room: {
      default: () => {}
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters["user/employeeId"];
    }
  }
};
</script>
<style lang="scss" scoped>
.room_info_wrapper {
  position: relative;
  display: flex;
  align-items: center;
  .unread_message_count {
    background-color: #009a40;
    color: white;
    border-radius: 12px;
    padding: 3px;
    top: 0;
    right: 0;
    font-size: 12px;
    position: absolute;
    font-weight: bold;
  }
  .avatar {
    transform: scale(1.3);
  }
  .room_information {
    margin: 0 0 0 20px;
    .room_name {
      font-size: 14px;
      cursor: pointer;
    }
    .room_description {
      font-size: 12px;
    }
  }
}
</style>
