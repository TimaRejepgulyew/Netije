<template>
  <div id="chat_room_header" v-if="room">
    <component :is="roomType" :room="room" />
  </div>
</template>

<script>
import privateRoomInfo from "~/components/chat/components/private-room-info.vue";
import groupRoomInfo from "~/components/chat/components/group-room-info.vue";
import RoomType from "~/components/chat/infrastructure/constants/roomType.js";
export default {
  components: {
    privateRoomInfo,
    groupRoomInfo
  },
  props: {
    room: {
      type: Object
    }
  },
  computed: {
    roomType() {
      switch (this.room.roomType) {
        case RoomType.Private:
          return "privateRoomInfo";
        case RoomType.Group:
          return "groupRoomInfo";
      }
    }
  }
};
</script>

<style lang="scss">
#chat_room_header {
  padding: 5px 20px;
  display: flex;
  align-items: center;
}
</style>
    