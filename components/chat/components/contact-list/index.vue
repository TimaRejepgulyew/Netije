<template>
    <div id="list_container">
        <SearchPanel
            :searchInProgress="searchInProgress"
            @valueChanged="setSearchValue"
            @inFocus="inFocus"
            @openRoomConstructor="openRoomConstructor"
        />
        <LastRoomsList v-if="showLastRooms" @setCurrentRoom="setCurrentRoom" />
        <AllRoomsList
            v-else
            :searchValue="searchValue"
            @setCurrentRoom="setCurrentRoom"
            @createRoom="createRoom"
        />
    </div>
</template>

<script>
import SearchPanel from "~/components/chat/components/contact-list/search-panel.vue";
import LastRoomsList from "~/components/chat/components/contact-list/last-rooms-list.vue";
import AllRoomsList from "~/components/chat/components/contact-list/all-rooms-list.vue";
export default {
    components: {
        SearchPanel,
        LastRoomsList,
        AllRoomsList,
    },
    data() {
        return {
            searchInProgress: false,
            searchValue: "",
        };
    },
    computed: {
        showLastRooms() {
            if (this.searchValue || this.searchInProgress) {
                return false;
            }
            return true;
        },
    },
    methods: {
        inFocus(value) {
            this.searchInProgress = value;
        },
        setSearchValue(value) {
            this.searchValue = value;
        },
        setCurrentRoom(room) {
            this.searchInProgress = false;
            this.$store.commit("chatStore/SET_CURRENT_ROOM", room);
        },
        createRoom(user) {
            this.$chat.createRoom(user.id);
        },
        openRoomConstructor(roomType) {
            this.searchInProgress = false;
            this.$emit("openRoomConstructor", roomType);
        },
    },
};
</script>

<style lang="scss">
#list_container {
    padding: 10px 10px 10px 10px;
    height: 100%;
    border-right: 1px solid $base-border-color;
}
</style>
