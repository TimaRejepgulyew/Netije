<template>
    <div>
        <div class=" d-flex justify-center ">
            <DxButton
                v-if="canLoading"
                stylingMode="text"
                type="default"
                @click="loadMessages"
                :text="$t('chat.loadMessages')"
            />
        </div>
        <div class="message--list">
            <component
                ref="message"
                v-for="data in messages"
                :message="data"
                :key="data._id"
                :is="componentType(data.type)"
            />
        </div>
    </div>
</template>
<script>
import MessageService from "../../../infrastructure/services/message.service.js";
import DxList from "devextreme-vue/list";
import messageItem from "./message-item";
import fileItem from "./file-item";
import { DxButton } from "devextreme-vue";
import MessageType from "../../../infrastructure/constants/messageType.js";

export default {
    components: {
        DxList,
        DxButton,
        messageItem,
        fileItem
    },
    props: {
        roomId: {
            required: true,
            type: String
        }
    },
    async created() {
        if (!this.hasMessages) await this.loadMessages();
        else
            this.messages = [
                ...this.$store.getters["chatStore/getMessages"](
                    this.roomId.toString()
                )
            ];
        this.showLastMessage();
    },
    data() {
        return {
            isLoading: false,
            take: 15,
            messages: [],
            canLoading: true
        };
    },
    watch: {
        messageCount: function(value, oldValue) {
            this.refreshMessages();
        }
    },
    computed: {
        messageCount() {
            return this.$store.getters["chatStore/messageCount"](this.roomId);
        },
        currentMessages() {
            return this.$store.getters["chatStore/getMessages"](
                this.roomId.toString()
            );
        },
        skip() {
            return this.messages.length;
        },
        hasMessages() {
            return this.$store.getters["chatStore/hasMessages"](this.roomId);
        }
    },
    methods: {
        componentType(type) {
            if (type === MessageType.Message) {
                return "messageItem";
            } else {
                return "fileItem";
            }
        },
        refreshMessages() {
            this.messages = this.$store.getters["chatStore/getMessages"](
                this.roomId.toString()
            );
            this.showLastMessage();
        },
        showLastMessage() {
            if (true) {

                let el = this.$refs.message[this.$refs.message.length - 1].$el;
                el.scrollIntoView(false);
                el.click();
            }
        },
        async loadMessages() {
            this.isLoading = true;
            const data = await MessageService.getMessages(this, {
                skip: this.skip,
                take: this.take,
                roomId: this.roomId
            });
            this.messages = [...data.data.messages.reverse(), ...this.messages];
            if (data.totalCount === -1) {
                this.canLoading = false;
            }
        }
    }
};
</script>
<style lang="scss">
.justify-center {
    padding: 8px;
    justify-content: center;
}
.message--list {
    width: 100%;
}
</style>
