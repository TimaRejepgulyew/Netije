<template>
    <div id="chat_search_panel" tabindex="-1">
        <div class="text_box">
            <DxTextBox
                ref="searchTextBox"
                stylingMode="underlined"
                :value.sync="searchValue"
                @value-changed="valueChanged"
                @focus-in="inFocus(true)"
            >
                <DxTextBoxButton
                    location="before"
                    name="searchButton"
                    :options="searchButtonOptions"
                />
                <DxTextBoxButton
                    location="after"
                    name="customClearButton"
                    :options="customClearButtonOptions"
                />
            </DxTextBox>
        </div>
        <DxDropDownButton
            icon="plus"
            stylingMode="text"
            :showArrowIcon="false"
            :focusStateEnabled="false"
            :items="dropDownButtonItems"
            displayExpr="text"
            valueExpr="roomType"
            :drop-down-options="{ width: 200 }"
        />
    </div>
</template>

<script>
import {
    DxTextBox,
    DxButton as DxTextBoxButton
} from "devextreme-vue/text-box";
import DxDropDownButton from "devextreme-vue/drop-down-button";
import RoomType from "~/components/chat/infrastructure/constants/roomType.js";
export default {
    components: {
        DxTextBox,
        DxTextBoxButton,
        DxDropDownButton
    },
    props: {
        searchInProgress: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            searchValue: ""
        };
    },
    computed: {
        searchButtonOptions() {
            return {
                icon: "search",
                style: "text",
                activeStateEnabled: false,
                focusStateEnabled: false,
                hoverStateEnabled: false,
                onClick: () => {
                    this.$refs["searchTextBox"].instance.focus();
                }
            };
        },
        customClearButtonOptions() {
            return {
                icon: "clear",
                style: "text",
                visible: this.searchInProgress,
                activeStateEnabled: false,
                focusStateEnabled: false,
                hoverStateEnabled: false,
                onClick: () => {
                    this.value = "";
                    this.inFocus(false);
                }
            };
        },
        dropDownButtonItems() {
            return [
                {
                    text: this.$t("chat.createChat"),
                    roomType: RoomType.Private,
                    onClick: e => this.openRoomConstructor(e.itemData.roomType)
                },
                {
                    text: this.$t("chat.createGroupChat"),
                    roomType: RoomType.Group,
                    onClick: e => this.openRoomConstructor(e.itemData.roomType)
                }
            ];
        }
    },
    methods: {
        inFocus(condition) {
            this.$emit("inFocus", condition);
        },
        openRoomConstructor(roomType) {
            this.$emit("openRoomConstructor", roomType);
        },
        valueChanged(e) {
            this.$emit("valueChanged", this.searchValue.trim());
        }
    }
};
</script>

<style lang="scss">
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
