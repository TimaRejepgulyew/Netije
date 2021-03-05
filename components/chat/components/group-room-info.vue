<template>
  <div class="room_info_wrapper">
    <roomIcon :room="room" />
    <div class="room_information">
      <div class="room_name">{{room.roomName}}</div>
      <div class="room_description">
        <div
          v-for="(member,index) in room.members"
          :key="index"
          :title="member.name"
          @click="showEmployeeCard(member.id)"
        >
          <userIcon :path="member.personalPhotoHash" :fullName="member.name" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import roomIcon from "~/components/chat/components/room-icon.vue";
import userIcon from "~/components/Layout/userIcon.vue";
export default {
  components: {
    roomIcon,
    userIcon
  },
  props: {
    room: {
      default: () => {}
    }
  },
  methods: {
    showEmployeeCard(id) {
      this.$popup.employeeCard(
        this,
        {
          employeeId: id
        },
        {
          height: "auto"
        }
      );
    }
  },
  created() {
    // console.log(this.room);
  }
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
