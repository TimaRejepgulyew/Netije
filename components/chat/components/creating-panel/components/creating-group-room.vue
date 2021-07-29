<template>
  <div class="main-panel-container">
    <div>
      <div class="d-flex align-center">
        <img
          class="chat-user-icon--small"
          src="~static/icons/quide-page/users.svg"
          alt="userIcon"
        />
        <div class="selector">
          <EmployeeTagBox
            :storeApi="$dataApi.chat.user"
            :value="members"
            valueExpr="id"
            @valueChanged="membersSelected"
          />
        </div>
      </div>
      <div class="d-flex align-center">
        <span class="dx-field-item-label-text input-label">
          {{ $t("chat.groupName") }}
        </span>
        <div class="selector">
          <DxTextBox :showClearButton="true" v-model.trim="groupName">
          </DxTextBox>
        </div>
      </div>
    </div>
    <div class="creating-descriptions">
      <section>
        <img
          class="chat-user-icon"
          src="~static/icons/quide-page/users.svg"
          alt="userIcon"
        />
      </section>
      <h3>{{ $t("chat.creatingPanel.groupChat") }}</h3>
      <p class="creating-panel-description">
        {{ $t("chat.creatingPanel.groupChatDescr") }}
      </p>
      <p></p>
      <h1 class="start_btn">
        <DxButton
          :disabled="!isValideRoom"
          type="success"
          text="Начать чат"
          @click="createRoom"
        ></DxButton>
      </h1>
    </div>
  </div>
</template>

<script>
import customSelectItem from "~/components/employee/custom-select-box-item.vue";
import { DxLoadIndicator } from "devextreme-vue/load-indicator";
import EmployeeTagBox from "~/components/employee/custom-tag-box.vue";
import { DxTextBox } from "devextreme-vue/text-box";
import { DxButton } from "devextreme-vue";
import dataApi from "~/static/dataApi";
export default {
  components: {
    customSelectItem,
    DxLoadIndicator,
    EmployeeTagBox,
    DxTextBox,
    DxButton,
  },
  inject: ["openGroupChat"],
  props: {
    roomType: {
      type: Number,
    },
  },
  data() {
    return {
      userApi: dataApi.chat.User,
      groupName: "",
      members: [],
    };
  },
  computed: {
    isValideRoom() {
      return this.groupName && this.members.length > 0;
    },
  },
  methods: {
    membersSelected(val) {
      this.members = val;
    },
    async createRoom() {
      const roomId = await this.$chat.createGroupRoom({
        name: this.groupName,
        members: this.members,
      });
      this.openGroupChat(roomId);
    },
  },
};
</script>

<style lang="scss">
.input-label {
  padding: 0 8px;
}
</style>
