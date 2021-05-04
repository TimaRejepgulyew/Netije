<template>
    <div class="header-chatig-room">
        <chatIcon :size="35" :name="room.name" :path="room.avatar" />
        <div class="room_information ">
            <div class="room_name">
                <span @click="showEmployeeCard">{{ room.name }}</span>
            </div>
            <div class="room_description">{{ chatingWith.jobTitle }}</div>
        </div>
        <div class="small-text" :class="{ 'color-green': chatingWith.active }">
            {{ isOnline }}
        </div>
    </div>
</template>

<script>
import moment from "moment";
import chatIcon from "~/components/chat/components/chat-icon.vue";
export default {
    components: {
        chatIcon
    },
    props: {
        room: {
            default: () => {}
        }
    },
    methods: {
        showEmployeeCard() {
            this.$popup.employeeCard(
                this,
                {
                    employeeId: this.room.user.id
                },
                {
                    height: "auto"
                }
            );
        }
    },
    computed: {
        ownId() {
            return this.$store.getters["user/employeeId"];
        },
        chatingWith() {
            return this.room.members.find(member => member.id !== this.ownId);
        },
        isOnline() {
            moment.locale("ru");
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
.header-chatig-room {
    height: 50px;
    padding: 8px;
    margin: 8px;
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
