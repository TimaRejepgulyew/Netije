<template>
    <div class="chating_container">
        <room-header :room="room" />
        <list-messages :roomId="roomId" class="message--list__container" />
        <texting-panel @sendFiles="sendFiles" @sendMessage="sendMessage" />
    </div>
</template>

<script>
import listMessages from "../components/list-messages.vue";
import roomHeader from "./components/header.vue";
import textingPanel from "../components/texting-panel";
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
    },
    methods: {
        sendMessage(value) {
            this.$chat.sendMessage({ roomId: this.roomId, text: value });
        },
        sendFiles(files) {
            this.$awn.async(
                this.$chat.sendFiles({ roomId: this.roomId, files: files })
            );
        }
    }
};
</script>

<style></style>
