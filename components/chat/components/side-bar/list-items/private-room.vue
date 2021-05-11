<template>
    <section class="d-flex">
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
        }
    },
    computed: {
        ownId() {
            return this.$store.getters["user/employeeId"];
        },
        chatingWith() {
            return this.data.members.find(member => member.id !== this.ownId);
        },
        isOnline() {
            moment.locale(this.$i18n.locale);
            return this.chatingWith.active
                ? this.$t("chat.online")
                : `${this.$t("chat.was")} ${moment(
                      this.chatingWith.lastActiveTime
                  ).calendar()}`;
        }
    }
};
</script>

<style lang="scss" scoped>
.user-icon {
    padding: 8px;
}
.color-green {
    color: $base-accent;
}
.small-text {
    font-size: 10px;
}
</style>
