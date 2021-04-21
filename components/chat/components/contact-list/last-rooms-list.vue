<template>
    <DxList :data-source="dataSource" height="100%">
        <template #item="{ data }">
            <div @click="setCurrentRoom(data)" v-if="data.messageCount > 0">
                <RoomInfo :room="data" />
            </div>
        </template>
    </DxList>
</template>

<script>
import DxList from "devextreme-vue/list";
import ArrayStore from "devextreme/data/array_store";
import RoomInfo from "~/components/chat/components/contact-list/room-info.vue";
export default {
    components: {
        DxList,
        RoomInfo,
    },
    computed: {
        dataSource() {
            return new ArrayStore({
                key: "id",
                data: this.$store.getters["chatStore/rooms"].filter((el) => {
                    if (el.messageCount > 0) return el;
                }),
            });
        },
    },
    methods: {
        setCurrentRoom(room) {
            this.$emit("setCurrentRoom", room);
        },
    },
};
</script>

<style lang="scss" scoped></style>
