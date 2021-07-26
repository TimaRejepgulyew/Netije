<template>
    <div class="aside-chat-panel">
        <searchPanel
            @input="
                value => {
                    this.activateSearchList();
                    this.valueChanged(value);
                }
            "
            @clear="
                value => {
                    activateMyRoomList();
                    this.valueChanged(value);
                }
            "
        />
        <searchList
            v-if="activeList === 'searchList'"
            :searchValue="searchValue"
        />
        <myRoomsList v-else-if="activeList === 'myRoomList'" />
    </div>
</template>

<script>
import searchPanel from "./search-panel";
import searchList from "./search-list";
import myRoomsList from "./my-rooms-list";
export default {
    components: {
        myRoomsList,
        searchPanel,
        searchList
    },
    data() {
        return {
            searchValue: null,
            activeList: "myRoomList"
        };
    },
    methods: {
        valueChanged(value) {
            this.searchValue = value;
        },
        activateSearchList() {
            this.activeList = "searchList";
        },
        activateMyRoomList() {
            this.activeList = "myRoomList";
        }
    }
};
</script>

<style lang="scss">
.aside-chat-panel {
    padding: 8px;
}
</style>
