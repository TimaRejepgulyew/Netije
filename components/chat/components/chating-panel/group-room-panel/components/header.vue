<template>
    <div class="header-chatig-room">
        <div>
            <chatIcon
                id="groupRoomMenu"
                class="groupRoomMenu"
                :size="35"
                :name="room.name"
                :path="room.avatar"
            />
        </div>
        <!-- <DxTooltip
            width="400px"
            target="#groupRoomMenu"
            :visible="groupRoomMenuOpen"
            :close-on-outside-click="true"
        >
            <div>
                <DxList
                    slot="users"
                    pageLoadMode="nextButton"
                    :data-source="usersList"
                    :show-selection-controls="true"
                    selection-mode="multiple"
                    :focusStateEnabled="false"
                    :activeStateEnabled="false"
                    :search-enabled="false"
                    :scrolingEnabled="true"
                    :selected-item-keys="selectedItemKeys"
                >
                    <template #item="{data}">
                        <user-item
                            :disabled="true"
                            class="has-white-space"
                            :data="data"
                        />
                    </template>
                </DxList>
                <DxButton
                    :text="$t('chat.invateToRoom')"
                    type="normal"
                    stylingMode="text"
                    @click="inviteToRoom"
                />
            </div>
        </DxTooltip> -->
        <div class="room_information">
            <div>
                {{ room.name }}
            </div>
            <div class="d-flex">
                <div
                    class="member__icon-container"
                    :class="{ 'border--green': member.active }"
                    v-for="member in room.members"
                    :key="member.id"
                >
                    <chatIcon
                        class="member__icon"
                        :size="25"
                        :name="member.name"
                        :path="member.personalPhotoHash"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DxButton from "devextreme-vue/button";
import userItem from "~/components/chat/components/side-bar/list-items/user-item.vue";
import { DxTooltip } from "devextreme-vue/tooltip";
import chatIcon from "~/components/chat/components/chat-icon.vue";
import DxList from "devextreme-vue/list";
import DataSource from "devextreme/data/data_source";
export default {
    components: {
        chatIcon,
        DxTooltip,
        DxList,
        userItem,
        DxButton
    },
    props: {
        room: {
            default: () => {}
        }
    },
    data() {
        return {
            // groupRoomMenuOpen: false,
            // selectedItemKeys: []
        };
    },
    computed: {
        myId() {
            return this.$store.getters["user/employeeId"];
        }
        // usersList() {
        //     return new DataSource({
        //         store: this.$dxStore({
        //             key: "id",
        //             loadUrl: `${process.env.chatServerUrl}${this.$dataApi.chat.User}`
        //         }),
        //         filter: ["id", "<>", this.myId],
        //         paginate: true,
        //         pageSize: 5,
        //         displayExpr: "name"
        //     });
        // }
    },
    methods: {
        // showMenu() {
        //     console.log("this.groupRoomMenuOpen");
        //     this.groupRoomMenuOpen = true;
        // },
        // inviteToRoom(){
        // }
    }
};
</script>
<style lang="scss" scoped>
.groupRoomMenu {
    cursor: pointer;
}
.header-chatig-room {
    height: auto;
    padding: 8px;
    display: flex;
    align-items: center;
    .avatar {
        transform: scale(1.3);
    }
    .member__icon-container {
        border-radius: 50%;
        margin: 8px;
        .member__icon {
            margin: auto;
        }
    }
    .room_information {
        padding: 20px;
        margin: 20px;
    }
}
</style>
