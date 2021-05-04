<template>
    <div class="room_info_wrapper">
        <ChatIcon :name="room.name" :path="room.avatar || room.personalPhotoHash" />
        <div class="room_information">
            <div class="room_name">
                <b v-if="room.id == currentUser">
                    ({{ $t("chat.userInit") }})
                </b>
                {{ room.name }}
                <!-- <div class="room_description" v-if="room.lastMessage.text">{{room.lastMessage.text}}</div> -->
            </div>
        </div>
        <i class="unread_message_count" v-if="room.unreadMessageCount">
            {{ room.unreadMessageCount }}
        </i>
    </div>
</template>
<script>
import ChatIcon from "~/components/chat/components/chat-icon.vue";

export default {
    components: {
        ChatIcon,
    },
    props: {
        room: {
            default: () => {},
        },
    },
    computed: {
        currentUser() {
            return this.$store.getters["user/employeeId"];
        },
    },
};
</script>
<style lang="scss" scoped>
.room_info_wrapper {
    position: relative;
    display: grid;
    grid-template-columns: 25px 1fr 10px;
    grid-column-gap: 5px;
    align-items: center;

    .unread_message_count {
        position: absolute;
        right: 0;
        padding: 0 3px;
        font-size: 10px;
        font-weight: bold;
        color: white;
        border-radius: 12px;
        background-color: $base-accent;
        transform: scale(1.2);
    }

    .room_information {
        .room_name {
            width: 190px;
            font-size: 14px;
            cursor: pointer;
            overflow: hidden;
        }

        .room_description {
            font-size: 12px;
        }
    }
}
</style>
