<template>
  <div id="chat_wrapper">
    <mainPanel @selectRoom="selectRoom" />
    <chatInterface :isActive="isActive" @focusOut="focusOut" />
  </div>
</template>

<script>
import mainPanel from "~/components/chat/main-panel.vue";
import chatInterface from "~/components/chat/chat-interface.vue";
export default {
  components: {
    mainPanel,
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
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>