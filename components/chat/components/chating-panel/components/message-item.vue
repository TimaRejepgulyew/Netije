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
            <span class="text">{{ message.text }}</span>
            <span class="time" v-if="message.created">
                {{ formatDate(message.created) }}
            </span>
        </div>
    </div>
</template>

<script>
import chatIcon from "~/components/chat/components/chat-icon.vue";
import moment from "moment";

export default {
    components: {
        chatIcon
    },
    props: {
        message: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        isOwnMessage(authorId) {
            return this.$store.getters["user/employeeId"] === authorId
                ? true
                : false;
        },
        fullDate(value) {
            moment.locale(this.$i18n.locale);
            return moment(value).format("LL");
        },
        formatDate(value) {
            moment.locale(this.$i18n.locale);
            return moment(value).format("LT");
        }
    }
};
</script>

<style lang="scss">
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
