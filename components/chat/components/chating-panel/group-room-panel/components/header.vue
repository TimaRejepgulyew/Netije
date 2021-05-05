<template>
    <div class="header-chatig-room">
        <chatIcon :size="35" :name="room.name" :path="room.avatar" />
        <div class="room_information">
            <div>
                {{ room.name }}
            </div>
            <div class="d-flex">
                <div
                    class="member__icon-container"
                    :class="{ 'border--green': member.active }"
                    v-for="member in room.members"
                    :key="member.id"
                >
                    <chatIcon
                        class="member__icon"
                        :size="25"
                        :name="member.name"
                        :path="member.personalPhotoHash"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import chatIcon from "~/components/chat/components/chat-icon.vue";
export default {
    components: {
        chatIcon
    },
    props: {
        room: {
            default: () => {}
        }
    }
};
</script>
<style lang="scss" scoped>
.header-chatig-room {
    height: auto;
    padding: 8px;
    display: flex;
    align-items: center;
    .avatar {
        transform: scale(1.3);
    }
    .member__icon-container {
        border-radius: 50%;
        margin: 8px;
        .member__icon {
            margin: auto;
        }
    }
    .room_information {
        padding: 20px;
        margin: 20px;
    }
}
</style>
