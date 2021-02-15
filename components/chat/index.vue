<template>
  <div id="chat_wrapper">
    <mainPanel @selectRoom="selectRoom" />
    <chatInterface :isActive="isActive" @focusOut="focusOut" />
  </div>
</template>

<script>
import mainPanel from "~/components/chat/main-panel.vue";
import chatInterface from "~/components/chat/chat-interface.vue";
import userIcon from "~/components/Layout/userIcon.vue";
export default {
  components: {
    mainPanel,
    userIcon,
    chatInterface
  },
  data() {
    return {
      isActive: false
    };
  },
  methods: {
    selectRoom() {
      this.isActive = true;
    },
    focusOut() {
      this.isActive = false;
    }
  },
  sockets: {
    connect() {
      console.log("Client IO connected");
    }
  }
};
</script>


<style lang="scss">
#chat_wrapper {
  height: 100vh;
  position: relative;
  width: 60px;
  padding: 50px 0;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
}
</style>