<template>
  <div>
    <div @click="focusOut" class="color_wrapper" v-if="isActive"></div>
    <transition name="slide-fade">
      <div v-if="isActive" id="chat_interface">
        <div @click="focusOut" class="close_btn">
          <span class="close"></span>
          {{chat}}
        </div>
        <div class="chat_interface_content">
          <div class="contacts">
            <ContactList @setRoom="setRoom" @createRoom="createRoom" />
          </div>
          <div class="chat_room">
            <ConstructorChatRoom :roomType="roomType" v-if="isCreateRoom" />
            <ChatRoom v-if="currentRoom && !isCreateRoom" />
            <EmptyLaout v-if="currentRoom == null" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>


<script>
import ContactList from "~/components/chat/components/chat-contact-list/index.vue";
import ChatRoom from "~/components/chat/components/chat-room/index.vue";
import EmptyLaout from "~/components/chat/components/chat-room-layouts/empty-layout.vue";
import ConstructorChatRoom from "~/components/chat/components/constructor-chat-room/index.vue";
export default {
  components: {
    ContactList,
    ConstructorChatRoom,
    ChatRoom,
    EmptyLaout
  },
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      chat: "Чат",
      isCreateRoom: false,
      roomType: null
    };
  },
  computed: {
    currentRoom() {
      return this.$store.getters["chatStore/currentRoom"];
    }
  },
  methods: {
    createRoom(roomType) {
      this.roomType = roomType;
      this.isCreateRoom = true;
    },
    setRoom() {
      this.isCreateRoom = false;
    },
    focusOut() {
      this.$emit("focusOut");
      this.$store.commit("chatStore/CLEAR_CURRENT_ROOM");
      this.isCreateRoom = false;
    }
  }
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.color_wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
  background-color: rgba(#000, 0.8);
  transition: 0.3s;
}

#chat_interface {
  position: fixed;
  background-color: #fff;
  z-index: 1000;
  height: 100%;
  width: 80vw;
  top: 0;
  right: 0;
  transition: 0.3s;
  outline: none;
  .close_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 1000;
    left: -70px;
    top: 5vh;
    background-color: $base-accent;
    height: 40px;
    width: 70px;
    border-radius: 10px 0 0 10px;
    color: #fff;
    cursor: pointer;
    .close {
      width: 20px;
      height: 20px;
      opacity: 1;
      &:hover {
        opacity: 1;
      }
      &:before,
      &:after {
        position: absolute;
        top: 13px;
        left: 20px;
        content: "";
        height: 15px;
        width: 2px;
        background-color: #fff;
      }
      &:before {
        transform: rotate(45deg);
      }
      &:after {
        transform: rotate(-45deg);
      }
    }
  }
  .chat_interface_content {
    height: 100%;
    width: 100%;
    display: flex;
    .contacts {
      width: 20vw;
    }
    .chat_room {
      width: 100%;
      height: 100%;
    }
  }
}
</style>