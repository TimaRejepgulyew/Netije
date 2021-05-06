<template>
    <section class="d-flex" @click="openPrivateChatByUser(data)">
        <div class="user-icon">
            <chatIcon :path="data.personalPhotoHash" :name="data.name" />
        </div>
        <div>
            <span> {{ data.name }}</span>
            <span class="small-text" :class="{ 'color-green': data.active }">
                {{ isOnline }}
            </span>
        </div>
    </section>
</template>

<script>
import moment from "moment";
import chatIcon from "~/components/chat/components/chat-icon.vue";
export default {
    components: {
        chatIcon
    },
    props: {
        data: {
            type: Object,
            required: true
        },
    },
    inject: ["openPrivateChatByUser"],
    computed: {
        isOnline() {
            moment.locale("ru");
            return this.data.active
                ? this.$t("chat.online")
                : `${this.$t("chat.was")} ${moment(
                      this.data.lastActiveTime
                  ).calendar()}`;
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
    font-size: 12px;
}
</style>
