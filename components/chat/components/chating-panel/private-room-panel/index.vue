<template>
    <div class="chating_container">
        <room-header :room="room" />
        <list-messages :roomId="roomId" class="message--list__container" />
        <texting-panel />
    </div>
</template>

<script>
import listMessages from "../components/list-messages.vue";
import roomHeader from "./components/header.vue";
import textingPanel from "../../chat-text-area";
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

<style></style>
