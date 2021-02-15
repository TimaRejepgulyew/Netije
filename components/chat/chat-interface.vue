<template>
  <div>
    <div @click="focusOut" class="color_wrapper" v-if="isActive"></div>
    <div id="chat_interface" :class="{active:isActive}">
      <div @click="focusOut" class="close_btn" v-if="isActive">
        <span class="close"></span>
        {{chat}}
      </div>
      <div class="chat_interface_content">
        <div class="contacts">
          <ContactList />
        </div>
        <div class="chat_room">
          <ChatRoom />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import ContactList from "~/components/chat/contact-list.vue";
import ChatRoom from "~/components/chat/chat-room.vue";
export default {
  components: {
    ContactList,
    ChatRoom
  },
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      chat: "Чат"
    };
  },
  methods: {
    focusOut() {
      this.$emit("focusOut");
    }
  }
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
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
  right: -100%;
  transition: 0.3s;
  outline: none;
  &.active {
    right: 00;
  }
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
    font-family: "Helvetica Neue", "Segoe UI", Helvetica, Verdana, sans-serif;
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