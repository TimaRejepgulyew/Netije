<template>
    <component :is="creatingPanelByType" />
</template>

<script>
import RoomType from "~/components/chat/infrastructure/constants/roomType.js";
import creatingPrivateRoom from "./components/creating-private-room.vue";
import creatingGroupRoom from "./components/creating-group-room.vue";
export default {
    components: {
        creatingPrivateRoom,
        creatingGroupRoom
    },
    props: {
        options: {
            type: Object,
            default: { roomType: RoomType.Private }
        }
    },
    computed: {
        creatingPanelByType() {
            return this.options.roomType === RoomType.Private
                ? "creating-private-room"
                : "creating-group-room";
        }
    }
};
</script>

<style lang="scss">
.creating-panel-description {
    text-align: center;
    display: block;
    width: 60%;
    margin: 0 auto;
}
.chat-user-icon {
    display: block;
    width: 20vw;
    height: auto;
}
.chat-user-icon--small {
    border: 1px solid $base-border-color;
    border-radius: 50%;

    margin: 8px;
    display: block;
    width: 40px;
    height: auto;
}
#constructor_chat_room_header {
    width: 100%;
    padding: 8px;
}
.selector {
    flex-grow: 1;
}
.main-panel-container {
    border-left: 1px solid $base-border-color;
    width: 100%;
    height: auto;
    display: grid;
    grid-template-rows: 60px 1fr;
    .creating-descriptions {
        margin: auto 0;
        position: relative;
        background-color: $base-bg;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .start_btn {
        height: 41px;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
            opacity: 0.5;
        }
    }
}
</style>
