<template>
    <section @click="openGroupChat(data.id)" class="d-flex align-center">
        <div class="user-icon">
            <chatIcon :path="data.avatar" :name="data.name" />
        </div>
        <div>
            <div>{{ data.name }}</div>
            <div class="small-text">
                {{ data.lastMessage.text }}
            </div>
        </div>
    </section>
</template>

<script>
import backArrow from "~/static/icons/chat/back-arrow.svg";
import chatIcon from "~/components/chat/components/chat-icon.vue";
export default {
    components: {
        chatIcon
    },
    props: {
        data: {
            type: Object,
            required: true,
            backArrow
        }
    },
    inject: ["openGroupChat"]
};
</script>

<style lang="scss">
.backArrow {
    display: block;
    width: 30px;
    height: 30px;
}
.user-icon {
    padding: 8px;
}
.color-green {
    color: $base-accent;
}
.small-text {
    font-size: 10px;
}
.has-white-space {
    height: auto;
    width: 13vw;
    overflow: hidden;
    text-overflow: ellipsis;

    white-space: pre;
}
</style>
