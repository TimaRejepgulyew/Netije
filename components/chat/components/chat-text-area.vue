<template>
    <div id="chat-text-area">
        <div class="text-area-body">
            <DxTextArea
                id="text-area"
                height="100px"
                @focus-out="focusOut"
                placeholder="Введите сообщение"
                stylingMode="underlined"
                valueChangeEvent="input"
                v-model.trim="value"
                @enter-key="sendMessage"
            />
            <DxButton
                :icon="sendArrowIcon"
                type="normal"
                stylingMode="text"
                @click="sendMessage"
            />
        </div>
        <div class="text-area-toolbar">
            <DxButton
                id="smilesBtn"
                :icon="smileIcon"
                type="normal"
                stylingMode="text"
                @click="openSmiles"
            />
            <DxTooltip
                :visible="smilesIsOpen"
                :close-on-outside-click="true"
                target="#smilesBtn"
            >
                <div class="smiles-list">
                    <div
                        @click="setSmile(smile)"
                        class="smile"
                        v-for="(smile, index) in smiles"
                        :key="index"
                    >
                        {{ renderSmile(smile) }}
                    </div>
                </div>
            </DxTooltip>
        </div>
    </div>
</template>

<script>
import DxTextArea from "devextreme-vue/text-area";
import DxButton from "devextreme-vue/button";
import { DxTooltip } from "devextreme-vue/tooltip";

import Smiles from "~/components/chat/infrastructure/constants/smiles-list.js";

export default {
    components: {
        DxTextArea,
        DxButton,
        DxTooltip,
    },
    data() {
        return {
            value: "",
            smilesIsOpen: false,
            sendArrowIcon: require("~/static/icons/send-message-btn.svg"),
            smileIcon: require("~/static/icons/smile.svg"),
        };
    },
    computed: {
        smiles() {
            return Smiles;
        },
    },
    methods: {
        focusOut(e) {
        },
        setSmile(smile) {
            this.value += this.renderSmile(smile);
            this.smilesIsOpen = false;
        },
        renderSmile(smile) {
            return String.fromCodePoint(smile);
        },
        openSmiles() {
            this.smilesIsOpen = !this.smilesIsOpen;
        },
        sendMessage(e) {
            if (this.value != "") {
                this.$emit("sendMessage", this.value);
                this.value = "";
            }
        },
    },
};
</script>

<style lang="scss">
.smile {
    display: block;
    font-size: 20px;
    cursor: pointer;

    &:hover {
        background-color: #ddd;
    }
}

.smiles-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: 30px;
    height: 90px;
    overflow-y: scroll;
}

#chat-text-area {
    .text-area-body {
        display: flex;
    }

    .text-area-toolbar {
    }

    .smile {
        display: block;
        width: 18px;
        height: 18px;
    }

    .dx-texteditor.dx-editor-underlined {
        border: none !important;
    }

    #text-area {
        flex-grow: 1;
    }
}
</style>
