<template>
  <div id="constructor_chat_room">
    <div id="constructor_chat_room_header">
      <div class="selector">
        <EmployeeSelectBox
          :stylingMode="'underlined'"
          :value="member"
          @valueChanged="emloyeeSelected"
        />
      </div>
    </div>
    <div class="chat_room_messages">
      <h3>Чат</h3>
      <p>Чат один на один виден только вам и вашему собеседнику.</p>
      <p>Найти нужного человека можно по имени, фамилии, должности или отделу.</p>
      <h1 class="start_btn" @click="createRoom">Начать чат</h1>
    </div>
  </div>
</template>

<script>
import customSelectItem from "~/components/employee/custom-select-box-item.vue";
import RoomType from "~/components/chat/infrastructure/constants/roomType.js";
import EmployeeSelectBox from "~/components/employee/custom-select-box.vue";

export default {
  components: {
    customSelectItem,
    EmployeeSelectBox
  },
  props: {
    roomType: {
      type: Number
    }
  },
  data() {
    return {
      member: null
    };
  },
  methods: {
    emloyeeSelected(val) {
      this.member = val;
      console.log("val", this.member);
    },
    createRoom() {
      this.$chat.createRoom({
        roomType: RoomType.Private,
        members: [this.member.id]
      });
    }
  },
  created() {
    console.log("this.roomType", this.roomType);
  }
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
#constructor_chat_room_header {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 5px 0 5px;
  .selector {
    flex-grow: 1;
  }
}
#constructor_chat_room {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 60px 1fr;
  .chat_room_messages {
    position: relative;
    background-color: rgba(215, 221, 230, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .start_btn {
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      opacity: 0.5;
    }
  }
}
</style>
