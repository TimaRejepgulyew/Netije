<template>
  <div id="main_panel">
    <div
      class="cell"
      v-for="(room,index) in rooms"
      :key="index"
      :title="room.roomName"
      @click="selectRoom(room.id)"
    >
      <roomIcon :room="room" />
    </div>
  </div>
</template>

<script>
import roomIcon from "~/components/chat/components/room-icon.vue";
export default {
  components: {
    roomIcon
  },
  computed: {
    rooms() {
      return this.$store.getters["chatStore/rooms"];
    }
  },
  methods: {
    selectRoom(id) {
      this.$store.commit("chatStore/SET_CURRENT_ROOM", id);
      this.$emit("selectRoom");
    }
  }
};
</script>


<style lang="scss">
#main_panel {
  position: fixed;
  width: 60px;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(10, 60px);
  justify-items: center;
  .cell {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      background-color: rgba($color: #ddd, $alpha: 0.7);
    }
    .avatar {
      transform: scale(1.3);
    }
  }
}
</style>