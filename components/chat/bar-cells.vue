<template>
    <div id="cells-wrapper">
        <div
            class="cell search"
            :title="$t('chatInterface.searchContacts')"
            @click="openForm"
        >
            <i class="dx-icon-search dx-icon-custom-style search_icon"></i>
        </div>
        <div class="rooms-cell">
            <div
                class="cell"
                v-for="(room, index) in rooms.filter((el) => el.messageCount > 0)"
                :key="index"
                :title="room.name"
                @click="selectRoom(room)"
            >
                <ChatIcon :size="35" :name="room.name" :path="room.avatar" />
                <i class="unread_message_count" v-if="room.unreadMessageCount">
                    {{ room.unreadMessageCount }}
                </i>
            </div>
        </div>
    </div>
</template>

<script>
import ChatIcon from "~/components/chat/components/chat-icon.vue";

export default {
    components: {
        ChatIcon,
    },
    computed: {
        rooms() {
            console.log("rooms", this.$store.getters["chatStore/rooms"]);
            return this.$store.getters["chatStore/rooms"];
        },
    },
    methods: {
        selectRoom(room) {
            this.$store.commit("chatStore/SET_CURRENT_ROOM", room);
            this.openForm();
        },
        openForm() {
            this.$emit("openForm");
        },
    },
};
</script>

<style lang="scss" scoped>
#cells-wrapper {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 60px 1fr;

    .search {
        border-bottom: 1px solid $base-border-color;

        i {
            color: $base-accent;
            font-size: 25px;
        }
    }

    .rooms-cell {
        display: grid;
        grid-template-columns: 1fr;
        grid-auto-rows: 60px;
        overflow-y: scroll;
    }

    .cell {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        scroll-snap-align: center;
        cursor: pointer;

        .unread_message_count {
            position: absolute;
            top: 8px;
            right: 8px;
            padding: 0 3px;
            font-size: 10px;
            font-weight: bold;
            color: white;
            border-radius: 12px;
            background-color: #f84932;
        }

        &:hover {
            background-color: rgba($color: #ddd, $alpha: 0.7);
        }
    }
}
</style>
