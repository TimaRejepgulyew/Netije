<template>
    <div>
        <component :roomId="options.roomId" :is="panelByType" />
    </div>
</template>

<script>
import privateRoomPanel from "./private-room-panel/index.vue";
import groupRoomPanel from "./group-room-panel/index.vue";
import RoomType from "~/components/chat/infrastructure/constants/roomType.js";
export default {
    components: {
        privateRoomPanel,
        groupRoomPanel
    },
    props: {
        options: {
            type: Object,
            // required: true,
            default: { roomType: RoomType.Group }
        }
    },
    computed: {
        panelByType() {
            return this.options.roomType === RoomType.Private
                ? "private-room-panel"
                : "group-room-panel";
        }
    }
};
</script>
<style lang="scss">
.message--list__container {
    background: url("../../../../static/icons/chating-backgroud.svg");
    overflow: scroll;
}
.chating_container {
    display: grid;
    height: 100%;
    grid-template-rows: 70px auto 150px;
}
</style>
