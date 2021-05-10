<template>
    <section class="d-flex align-center">
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
import chatIcon from "~/components/chat/components/chat-icon.vue";
export default {
    components: {
        chatIcon
    },
    props: {
        data: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss">
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
