<template>
  <component :is="roomTypeComponent" />
</template>

<script>
import groupChat from "~/components/chat/components/constructor-chat-room/group-chat.vue";
import privateChat from "~/components/chat/components/constructor-chat-room/private-chat.vue";
import RoomType from "~/components/chat/infrastructure/constants/roomType.js";

export default {
  components: {
    privateChat,
    groupChat
  },
  props: {
    roomType: {
      type: Number
    }
  },
  computed: {
    roomTypeComponent() {
      switch (this.roomType) {
        case RoomType.Private:
          return "privateChat";
        case RoomType.Group:
          return "groupChat";
      }
    }
  }
};
</script>

<style lang="scss">
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
