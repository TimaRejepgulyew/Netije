<template>
    <div class="d-flex align-center list-header">
        <div class="flex-grow">{{ text }}</div>
    </div>
</template>

<script>
import RoomType from "~/components/chat/infrastructure/constants/roomType.js";
export default {
    props: {
        type: {
            type: Number
        }
    },
    computed: {
        text() {
            return this.type === RoomType.Private
                ? this.$t("chat.buttons.privateRoom")
                : this.$t("chat.buttons.groupRoom");
        }
    }
};
</script>

<style lang="scss">
.list-header {
    font-size: 12px;
}
.flex-end {
    justify-self: end;
}
.flex-grow {
    flex-grow: 1;
}
</style>
