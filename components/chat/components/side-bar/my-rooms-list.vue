<template>
    <DxList :data-source="arrayStore" height="100%">
        <template #item="{ data }">
            <div @click="showRoom(data)" v-if="data.messageCount > 0">
                <component
                    :is="roomTypeComponent(data.roomType)"
                    v-if="data.messageCount > 0"
                    :data="data"
                />
            </div>
        </template>
    </DxList>
</template>

<script>
import RoomType from "~/components/chat/infrastructure/constants/roomType.js";
import DxList from "devextreme-vue/list";
import ArrayStore from "devextreme/data/array_store";
import groupRoomItem from "./list-items/group-room.vue";
import privateRoomItem from "./list-items/private-room.vue";
export default {
    components: {
        DxList,
        groupRoomItem,
        privateRoomItem
    },
    inject: ["openPrivateChat", "openGroupChat"],
    computed: {
        arrayStore() {
            return new ArrayStore({
                key: "id",
                data: this.$store.getters["chatStore/rooms"].filter(el => {
                    if (el.messageCount > 0) return el;
                })
            });
        }
    },
    methods: {
        roomTypeComponent(roomType) {
            return roomType === RoomType.Private
                ? "private-room-item"
                : "group-room-item";
        },
        showRoom(room) {
            if (room.roomType === RoomType.Private)
                this.openPrivateChat(room.id);
            else this.openGroupChat(room.id);
        }
    }
};
</script>

<style lang="scss" scoped></style>
