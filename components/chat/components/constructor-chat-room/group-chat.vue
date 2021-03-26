<template>
  <div id="constructor_chat_room">
    <div id="constructor_chat_room_header">
      <div class="selector">
        <EmployeeTagBox
          :activeStateEnabled="false"
          :hoverStateEnabled="false"
          :focusStateEnabled="false"
          :stylingMode="'underlined'"
          :height="60"
          @valueChanged="membersSelected"
        />
      </div>
    </div>
    <div class="chat_room_messages">
      <h3>Групповой чат</h3>
      <p>Закрытый чат виден только приглашенным пользователям.</p>
      <p>
        В чате можно обсуждать рабочие вопросы, которые касаются конкретных
        людей.
      </p>
      <h1 class="start_btn">
        <span v-if="hasMember" @click="createRoom">Начать чат</span>
      </h1>
    </div>
  </div>
</template>

<script>
import customSelectItem from "~/components/employee/custom-select-box-item.vue";
import ChatTextArea from "~/components/chat/components/chat-text-area.vue";
import { DxLoadIndicator } from "devextreme-vue/load-indicator";
import moment from "moment";
import RoomType from "~/components/chat/infrastructure/constants/roomType.js";
import EmployeeTagBox from "~/components/employee/custom-tag-box.vue";

export default {
  components: {
    customSelectItem,
    ChatTextArea,
    DxLoadIndicator,
    EmployeeTagBox
  },
  props: {
    roomType: {
      type: Number
    }
  },
  data() {
    return {
      members: null
    };
  },
  computed: {
    hasMember() {
      return this.members ? true : false;
    }
  },
  methods: {
    membersSelected(val) {
      if (val.length > 0) {
        this.members = val.map(el => {
          return el.id;
        });
      } else {
        this.members = null;
      }
    },
    createRoom() {
      this.$chat.createRoom({
        roomType: RoomType.Group,
        members: this.members
      });
    }
  },
  created() {}
};
</script>

<style lang="scss">
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
    height: 41px;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      opacity: 0.5;
    }
  }
}
</style>
