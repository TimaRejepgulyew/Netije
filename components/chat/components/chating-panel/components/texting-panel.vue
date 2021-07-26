<template>
    <div id="chat-text-area">
        <div>
            <div class="text-area-toolbar">
                <DxButton
                    id="smilesBtn"
                    :icon="smileIcon"
                    type="normal"
                    stylingMode="text"
                    @click="openSmiles"
                />
                <DxButton
                    :icon="fileClip"
                    type="normal"
                    stylingMode="text"
                    @click="upload"
                />
                <uploadFile ref="uploadBtn" @uploadFiles="uploadAttachments" />
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
            <div class="text-area-body">
                <DxTextArea
                    width="100%"
                    id="text-area"
                    height="100px"
                    @focus-out="focusOut"
                    :placeholder="$t('chat.textArea.placeHolder')"
                    stylingMode="underlined"
                    valueChangeEvent="input"
                    v-model.trim="value"
                    @enter-key="sendMessage"
                />
            </div>
        </div>
        <DxButton
            :icon="sendArrowIcon"
            type="normal"
            stylingMode="text"
            @click="sendMessage"
        />
    </div>
</template>

<script>
import DxTextArea from "devextreme-vue/text-area";
import DxButton from "devextreme-vue/button";
import { DxTooltip } from "devextreme-vue/tooltip";
import Smiles from "~/components/chat/infrastructure/constants/smiles-list.js";
import uploadFile from "./file-uploader";
export default {
    components: {
        DxTextArea,
        DxButton,
        DxTooltip,
        uploadFile
    },
    data() {
        return {
            value: "",
            smilesIsOpen: false,
            fileClip:require("~/static/icons/chat/clip.svg"),
            sendArrowIcon: require("~/static/icons/send-message-btn.svg"),
            smileIcon: require("~/static/icons/smile.svg")
        };
    },
    computed: {
        smiles() {
            return Smiles;
        }
    },
    methods: {
        upload() {
            this.$refs.uploadBtn.$el.click();
        },
        focusOut(e) {},
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
            if (this.value) {
                this.$emit("sendMessage", this.value);
                this.value = "";
            }
        },

        uploadAttachments(files) {
            this.$emit("sendFiles", files);
        }
    }
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
    border-top: 1px solid $base-border-color;
    padding: 0 8px;
    display: flex;
    height: 100%;
    justify-content: space-between;
    .text-area-body {
        display: flex;
        flex-grow: 1;
        width: 40vw;
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
