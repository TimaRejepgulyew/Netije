<template>
  <div class="room_info_wrapper">
    <chatIcon :name="room.name" :avatar="room.avatar" />
    <div class="room_information">
      <div class="room_name">{{room.name}}</div>
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
  }
};
</script>
<style lang="scss" scoped>
.room_info_wrapper {
  display: flex;
  align-items: center;
  .avatar {
    transform: scale(1.3);
  }
  .room_information {
    margin: 0 0 0 20px;
    .room_name {
      font-size: 17px;
      cursor: pointer;
    }
    .room_description {
      font-size: 12px;
    }
  }
}
</style>
