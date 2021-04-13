<template>
    <div class="room_info_wrapper">
        <chatIcon :name="room.name" :avatar="room.avatar" />
        <div class="room_information">
            <div class="room_name">{{ room.roomName }}</div>
            <div class="room_description">
                <div
                    v-for="(member, index) in room.members"
                    :key="index"
                    :title="member.name"
                    @click="showEmployeeCard(member.id)"
                >
                    <chatIcon :avatar="member.personalPhotoHash" :name="member.name" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import chatIcon from "~/components/chat/components/chat-icon.vue";
export default {
    components: {
        chatIcon,
    },
    props: {
        room: {
            default: () => {},
        },
    },
    methods: {
        showEmployeeCard(id) {
            this.$popup.employeeCard(
                this,
                {
                    employeeId: id,
                },
                {
                    height: "auto",
                }
            );
        },
    },
};
</script>
<style lang="scss" scoped>
.room_info_wrapper {
    display: flex;
    align-items: center;
    .avatar {
        transform: scale(1.3);
    }
    .room_information {
        margin: 0 0 0 20px;
        .room_name {
            font-size: 17px;
        }
        .room_description {
            padding: 0 5px;
            display: flex;
            .avatar {
                margin: 0 5px 0 0;
                transform: scale(1);
            }
        }
    }
}
</style>
