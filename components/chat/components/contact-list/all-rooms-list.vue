<template>
    <DxList :data-source="dataSource" height="100%" search-expr="name">
        <template :disabled="true" #item="{ data }">
            <div @click="checkRoom(data)">
                <RoomInfo :room="data" />
            </div>
        </template>
    </DxList>
</template>

<script>
import DxList from "devextreme-vue/list";
import DataSource from "devextreme/data/data_source";
import RoomInfo from "~/components/chat/components/contact-list/room-info.vue";
export default {
    components: {
        DxList,
        RoomInfo,
    },
    props: {
        searchValue: {
            type: String,
        },
    },
    computed: {
        dataSource() {
            return new DataSource({
                store: this.$dxStore({
                    key: "id",
                    loadUrl: `${process.env.chatServerUrl}${this.$dataApi.chat.User}`,
                }),
                filter: ["name", "contains", this.searchValue],
                paginate: false,
                pageSize: 15,
                displayExpr: "name",
            });
        },
        currentUser() {
            return this.$store.getters["user/employeeId"];
        },
    },
    methods: {
        checkRoom(user) {
            if (this.$store.getters["chatStore/hasRoom"](user)) {
                let room = this.$store.getters["chatStore/roomByUser"](user);
                this.$emit("setCurrentRoom", room);
                this.$emit("inFocus", false);
            } else {
                this.$emit("createRoom", user);
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
