<template>
    <div class="list_expander">
        <custom-expander
            :expantedDefault="true"
            :header="{ text: 'сотрудники' }"
            bodyTemplate="users"
            headerTemplate="header"
        >
            <div class="header-list" slot="header">
                <list-header :type="roomType.Private" />
            </div>
            <DxList
                slot="users"
                :show-selection-controls="true"
                pageLoadMode="nextButton"
                :data-source="usersList"
                :focusStateEnabled="false"
                :activeStateEnabled="false"
                :search-enabled="false"
                :scrolingEnabled="true"
            >
                <template #item="{data}">
                    <user-item
                        :disabled="true"
                        class="has-white-space"
                        @click="openPrivateChat(data)"
                        :data="data"
                    />
                </template>
            </DxList>
        </custom-expander>
        <custom-expander
            :expantedDefault="true"
            :header="{ text: 'группы' }"
            bodyTemplate="group"
            headerTemplate="header"
        >
            <div class="header-list" slot="header">
                <list-header :type="roomType.Group" />
            </div>
            <DxList
                slot="group"
                :data-source="roomsList"
                :focusStateEnabled="false"
                :activeStateEnabled="false"
                :search-enabled="false"
                :scrolingEnabled="true"
            >
                <template #item="{data}">
                    <group-room-item
                        @click="openGroupChat(data._id)"
                        :data="data"
                    />
                </template>
            </DxList>
        </custom-expander>
    </div>
</template>

<script>
import RoomType from "~/components/chat/infrastructure/constants/roomType.js";
import customExpander from "~/components/custom-expander/index.vue";
import DxList from "devextreme-vue/list";
import DataSource from "devextreme/data/data_source";
import groupRoomItem from "./list-items/group-room.vue";
import userItem from "./list-items/user-item.vue";
import listHeader from "./list-items/list-item-header.vue";
import { DxButton } from "devextreme-vue";
export default {
    components: {
        DxList,
        DxButton,
        customExpander,
        userItem,
        groupRoomItem,
        listHeader
    },
    props: {
        searchValue: {
            type: String
        }
    },
    methods: {},
    inject: ["openPrivateChatByUser", "openGroupChat"],
    computed: {
        myId() {
            return this.$store.getters["user/employeeId"];
        },
        roomType() {
            return RoomType;
        },
        usersList() {
            return new DataSource({
                store: this.$dxStore({
                    key: "id",
                    loadUrl: `${process.env.chatServerUrl}${this.$dataApi.chat.User}`
                }),
                filter: [
                    ["name", "contains", this.searchValue],
                    "and",
                    ["id", "<>", this.myId]
                ],
                paginate: true,
                pageSize: 5,
                displayExpr: "name"
            });
        },
        roomsList() {
            return new DataSource({
                store: this.$dxStore({
                    key: "id",
                    loadUrl: `${process.env.chatServerUrl}${this.$dataApi.chat.RoomsByFilter}`
                }),
                filter: [
                    ["name", "contains", this.searchValue],
                    "and",
                    ["roomType", "=", RoomType.Group]
                ],
                paginate: true,
                pageSize: 5,
                displayExpr: "name"
            });
        }
    }
};
</script>

<style class="scss">
.has-white-space {
    height: auto;
    width: 20vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
}
.list_expander {
    height: 94vh;
    overflow: scroll;
}
</style>
