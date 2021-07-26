<template>
    <div>
        <component
            :roomId="options.roomId"
            :is="panelByType"
            :key="options.roomId"
        />
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
    border-right: 1px solid $base-border-color;
    background: url("../../../../static/icons/chat/chating-backgroud.svg");
    height: auto;
    width: auto;
    overflow: auto;
    //  padding: 50px 0;
}
.header-chatig-room {
    border-bottom: 1px solid $base-border-color;
}
.chating_container {
    display: grid;
    height: 100%;
    overflow: hidden;
    min-width: 44vw;
    grid-template-rows: minmax(80px, 100px) auto 100px;
}
</style>
