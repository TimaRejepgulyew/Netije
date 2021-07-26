<template>
    <div id="chat_search_panel" tabindex="-1">
        <DxButton
            icon="search"
            :activeStateEnabled="false"
            :focusStateEnabled="false"
            :hoverStateEnabled="false"
            type="default"
            stylingMode="text"
            @click="input(' ')"
        />
        <div class="searchInput">
            <DxTextBox
                stylingMode="underlined"
                :showClearButton="true"
                valueChangeEvent="input"
                v-model="searchValue"
            >
            </DxTextBox>
        </div>
        <DxDropDownButton
            icon="plus"
            stylingMode="underlined"
            :showArrowIcon="false"
            :focusStateEnabled="false"
            :items="createDropDownButton"
            displayExpr="text"
            valueExpr="roomType"
            :drop-down-options="{ width: 200 }"
        />
    </div>
</template>

<script>
import { DxButton } from "devextreme-vue";
import { DxTextBox } from "devextreme-vue/text-box";
import DxDropDownButton from "devextreme-vue/drop-down-button";
import RoomType from "~/components/chat/infrastructure/constants/roomType.js";
export default {
    components: {
        DxDropDownButton,
        DxTextBox,
        DxButton
    },
    data() {
        return {
            searchValue: ""
        };
    },
    watch: {
        searchValue: function(value) {
            if (value) {
                this.$emit("input", value.trim());
            } else {
                this.$emit("clear", value);
            }
        }
    },
    inject: ["creatingRoom"],
    methods: {
        imput(value) {
            this.$emit("input", value);
        }
    },
    computed: {
        createDropDownButton() {
            return [
                {
                    text: this.$t("chat.createChat"),
                    roomType: RoomType.Private,
                    onClick: e => this.createRoom(e.itemData.roomType)
                },
                {
                    text: this.$t("chat.createGroupChat"),
                    roomType: RoomType.Group,
                    onClick: e => this.createRoom(e.itemData.roomType)
                }
            ];
        }
    },
    methods: {
        createRoom(roomType) {
            this.creatingRoom({ roomType });
        },
        input(value) {
            this.searchValue = value;
        }
    }
};
</script>

<style lang="scss">
.searchInput {
    flex-grow: 1;
}
#chat_search_panel {
    padding: 0 0 5px 0;
    display: flex;
    align-items: center;
    border-bottom: 1px solid $base-border-color;
    .dx-button-mode-contained {
        border: none;
    }
    .text_box {
        flex-grow: 1;
    }
    .dx-texteditor.dx-editor-underlined {
        border-bottom: 0px;
    }
    &:hover {
        border-bottom: 1px solid $base-accent;
    }
}
</style>
