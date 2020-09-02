<template>
  <div>
    <DxButton :icon="startIcon" :hint="$t('buttons.start')" :on-click="startTask" />
    <DxPopup
      :showTitle="false"
      :visible.sync="isPopupAccesRight"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      width="500px"
      :height="'auto'"
    >
      <div class="d-flex f-column js-space-between">
        <div>{{$t("task.message.nothaveAccessRight")}}</div>
        <div>
          <DxButton
            v-for="btn in avaliableAccessRight"
            :text="btn.name"
            :on-click="()=>sendRecipientAccessRight(btn.id)"
            :key="btn.id"
          />
          <DxButton
            :text="$t('buttons.cancel')"
            :hint="$t('buttons.cancel')"
            :on-click="tooglePopupAccessRight"
          />
        </div>
      </div>
    </DxPopup>
  </div>
</template>

<script>
import dataApi from "~/static/dataApi.js";
import DxButton from "devextreme-vue/button";
import { DxPopup } from "devextreme-vue/popup";
import startIcon from "~/static/icons/start.svg";
export default {
  components: {
    DxButton,
    DxPopup,
  },
  props: ["taskId"],
  inject: ["isValidTask"],
  data() {
    return {
      startIcon,
      avaliableAccessRight: [],
      isPopupAccesRight: false,
    };
  },

  computed: {
    task() {
      return this.$store.getters[`tasks/${this.taskId}/task`];
    },
  },
  methods: {
    validateAttachment() {
      let isValid = true;
      let attachments = this.$store.getters[
        `tasks/${this.taskId}/task`
      ].attachmentGroups.filter((attachment) => attachment.isRequired);
      attachments.forEach((attachment) => {
        if (!attachment.entities) isValid = false;
      });
      if (!isValid) {
        alert(this.generateHtmlError(attachments), this.$t("shared.error"));
      }
      return isValid;
    },
    generateHtmlError(attachments) {
      return attachments.map((attachment) => {
        if (!attachment.entities) {
          return `<li class="red">Вложите ${attachment.groupTitle.toLowerCase()}</li>`;
        }
      });
    },
    async sendRecipientAccessRight(accessRightId) {
      await this.$axios.post(dataApi.task.CheckMembersPermissions, {
        taskId: this.taskId,
        taskType: this.task.taskType,
        accessRight: accessRightId,
      });

      this.startTask();
      this.tooglePopupAccessRight();
    },
    tooglePopupAccessRight() {
      this.isPopupAccesRight = !this.isPopupAccesRight;
    },
    async checkRecipientAccessRight() {
      const {
        data: { succeeded, availableTypes },
      } = await this.$axios.get(
        `${dataApi.task.CheckMembersPermissions}${this.task?.taskType}/${this.taskId}`
      );
      // const availableTypes = [
      //   { id: 0, name: "Read" },
      //   { id: 1, name: "write" },
      // ];
      // const succeeded = false;
      if (!succeeded) {
        this.avaliableAccessRight = availableTypes;
        this.tooglePopupAccessRight();
        return false;
      } else {
        return true;
      }
    },
    async startTask() {
      if (this.validateAttachment() && this.isValidTask()) {
        const hasRecipientAccessRight = await this.checkRecipientAccessRight();
        if (!hasRecipientAccessRight) return false;

        this.$awn.asyncBlock(
          this.$store.dispatch(`tasks/${this.taskId}/start`),
          (e) => {
            this.$emit("onStart");
          },
          (e) => this.$awn.alert()
        );
      }
    },
  },
};
</script>

<style>
.f-column {
  min-height: 150px;
  display: flex;
  flex-direction: column;
}
.js-space-between {
  align-content: space-between;
  justify-content: space-between;
}
</style>
