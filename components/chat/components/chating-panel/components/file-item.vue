<template>
    <div
        class="message_wrapper"
        :class="{ user_message: isOwnMessage(message.author.id) }"
    >
        <chatIcon
            :name="message.author.name"
            :path="message.author.personalPhotoHash"
            :size="35"
        />
        <div class="chat_message" :title="fullDate(message.created)">
            <span class="time" v-if="message.created">
                {{ formatDate(message.created) }}
            </span>
            <div>
                <div
                    @click="downloadAttachment(attachment)"
                    class="file_attachment"
                    v-for="attachment in message.attachments"
                    :key="attachment._id"
                >
                    <div>
                        {{ attachment.name }}
                        <div>{{ showSize(attachment.size) }}</div>
                    </div>
                    <document-icon
                        class="file-icon"
                        size="md"
                        :extension="attachment.extension"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import documentIcon from "~/components/page/document-icon";
import chatIcon from "~/components/chat/components/chat-icon.vue";
import moment from "moment";
import { saveAs } from "file-saver";
import MessageService from "../../../infrastructure/services/message.service";
export default {
    components: {
        chatIcon,
        documentIcon
    },
    props: {
        message: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        downloadAttachment(attachment) {
            this.$awn.asyncBlock(
                MessageService.downloadAttachment(this, attachment),
                () => {
                    this.$awn.success();
                },
                e => {
                    this.$awn.alert(e);
                    console.error(e);
                }
            );
        },
        showSize(size) {
            if (size < 1000000) return Math.round(size / 1000) + " KB";
            else return Math.round(size / 1000000) + " MB";
        },
        isOwnMessage(authorId) {
            return this.$store.getters["user/employeeId"] === authorId
                ? true
                : false;
        },
        fullDate(value) {
            moment.locale("ru");
            return moment(value).format("LL");
        },
        formatDate(value) {
            moment.locale("ru");
            return moment(value).format("LT");
        }
    }
};
</script>

<style lang="scss">
.file_attachment {
    cursor: pointer;
    border: 1px solid #d7e4ea;
    background-color: #e2ffc9;
    border-radius: 10px;
    margin: 8px;
    padding: 8px;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;
}
.file-icon {
    display: block;
    height: auto;
    padding: 8px;
    margin: 8px;
}
.message-enter-active,
.message-leave-active {
    transition: opacity 0.6s;
}
.message-enter,
.message-leave-to {
    opacity: 0;
}
.message_wrapper {
    display: flex;
    align-items: flex-start;
    margin: 10px 60px;
    padding: 8px;
    &.user_message {
        justify-content: flex-end;
        .chat_message {
            order: -1;
            .text {
                background-color: #e2ffc9;
                border-radius: 10px 0 10px 10px;
            }
            .time {
                order: -1;
            }
        }
    }
    .chat_message {
        display: flex;
        align-items: flex-end;
        margin: 0 10px;
        max-width: 60%;
        .text {
            font-size: 14px;
            padding: 5px 10px;
            border: 1px solid $base-border-color;
            background-color: #fbfbfb;
            border-radius: 0 10px 10px 10px;
        }
        .time {
            font-size: 10px;
            margin: 5px;
        }
    }
}
</style>
