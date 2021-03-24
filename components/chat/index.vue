<template>
  <div id="chat_wrapper">
    <div id="chat_main_panel">
      <div @click="openForm" class="cell" title="Поиск контактов">
        <i class="dx-icon-search dx-icon-custom-style search_icon"></i>
      </div>
      <div
        class="cell"
        v-for="(room, index) in rooms"
        :key="index"
        :title="room.name"
        @click="selectRoom(room)"
      >
        <chatIcon :name="room.name" :avatar="room.avatar" />
        <span v-if="room.unreadMessageCount" class="unread_message_count">{{
          room.unreadMessageCount
        }}</span>
      </div>
    </div>
    <ChatInterface :isActive="isActive" @focusOut="focusOut" />
  </div>
</template>

<script>
import ChatInterface from "~/components/chat/chat-interface.vue";
import chatIcon from "~/components/chat/components/chat-icon.vue";

export default {
  components: {
    ChatInterface,
    chatIcon
  },
  data() {
    return {
      isActive: false
    };
  },
  computed: {
    rooms() {
      return this.$store.getters["chatStore/rooms"];
    }
  },
  methods: {
    selectRoom(room) {
      this.$store.commit("chatStore/SET_CURRENT_ROOM", room);
      this.openForm();
    },
    openForm() {
      this.isActive = true;
    },
    focusOut() {
      this.isActive = false;
    }
  },
  created() {
    console.log(this);
  }
};
</script>


<style lang="scss">
#chat_wrapper {
  height: 100vh;
  width: 60px;
  padding: 50px 0;
  position: relative;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
  #chat_main_panel {
    width: 100%;
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
      position: relative;
      cursor: pointer;
      .unread_message_count {
        background-color: #f84932;
        color: white;
        border-radius: 12px;
        padding: 0 3px;
        top: 8px;
        right: 8px;
        font-size: 10px;
        position: absolute;
        font-weight: bold;
      }
      &:hover {
        background-color: rgba($color: #ddd, $alpha: 0.7);
      }
      .avatar {
        transform: scale(1.3);
      }
    }
  }
}
</style>