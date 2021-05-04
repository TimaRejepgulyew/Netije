<template>
    <div >
        <div class=" d-flex justify-center ">
            <DxButton
                v-if="canLoading"
                stylingMode="text"
                type="default"
                @click="loadMessages"
                :text="$t('chat.loadMessages')"
            />
        </div>
        <DxList
            class="message--list"
            pageLoadMode="scrollBottom"
            :data-source="messages"
            :focusStateEnabled="false"
            :activeStateEnabled="false"
            :search-enabled="false"
            :hoverStateEnabled="false"
            search-expr="recipient.name"
        >
            <template #item="{data}">
                <div>
                    <message-item :message="data" :key="data._id" />
                </div>
            </template>
        </DxList>
    </div>
</template>

<script>
import MessageService from "../../../infrastructure/services/message.service.js";
import DxList from "devextreme-vue/list";
import messageItem from "./message-item";
import { DxButton } from "devextreme-vue";
export default {
    components: {
        DxList,
        DxButton,
        messageItem
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
    },
    data() {
        return {
            isLoading: false,
            take: 15,
            messages: [],
            canLoading: true
        };
    },
    computed: {
        skip() {
            return this.messages.length;
        },
        hasMessages() {
            return this.$store.getters["chatStore/hasMessages"](this.roomId);
        }
    },

    methods: {
        async loadMessages() {
            this.isLoading = true;
            const data = await MessageService.getMessages(this, {
                skip: this.skip,
                take: this.take,
                roomId: this.roomId
            });
            this.messages = [...data.data.messages, ...this.messages];
            console.log(data.totalCount);
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
    .dx-list-item {
        border-top: 0px;
    }
}
</style>
