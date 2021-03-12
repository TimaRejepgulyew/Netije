<template>
  <div id="main_panel">
    <div @click="openForm" class="cell" title="Поиск контактов">
      <i class="dx-icon-search dx-icon-custom-style search_icon"></i>
    </div>
    <div
      class="cell"
      v-for="(room,index) in rooms"
      :key="index"
      :title="room.name"
      @click="selectRoom(room)"
    >
      <chatIcon :name="room.name" :avatar="room.avatar" />
    </div>
  </div>
</template>

<script>
import chatIcon from "~/components/chat/components/chat-icon.vue";
export default {
  components: {
    chatIcon
  },
  computed: {
    rooms() {
      return this.$store.getters["chatStore/rooms"];
    }
  },
  methods: {
    openForm() {
      this.$emit("openForm");
    },
    selectRoom(room) {
      this.$store.commit("chatStore/SET_CURRENT_ROOM", room);
      this.openForm();
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
  .search_icon {
    color: #009a40;
    font-size: 30px;
  }
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