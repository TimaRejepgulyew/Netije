<template>
    <div class="chating_container">
        <room-header :room="room" />
        <list-messages
            :roomId="roomId"
            :key="roomId"
            class="message--list__container"
        />
        <texting-panel />
    </div>
</template>

<script>
import textingPanel from "../../chat-text-area";
import listMessages from "../components/list-messages.vue";
import roomHeader from "./components/header.vue";
export default {
    components: {
        listMessages,
        roomHeader,
        textingPanel
    },
    props: {
        roomId: String
    },
    computed: {
        room() {
            return this.$store.getters["chatStore/getRoom"](this.roomId);
        }
    }
};
</script>

<style lang="scss"></style>
