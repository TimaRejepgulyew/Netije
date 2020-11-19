<template>
  <div>
    <DxButton
      :icon="startIcon"
      :hint="$t('buttons.start')"
      :text="$t('buttons.start')"
      :on-click="validateAndStart"
    />
    <DxPopup
      :title="$t('shared.confirm')"
      :visible.sync="isPopupAccesRight"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      width="auto"
      :height="'auto'"
    >
      <div>
        <attachment-access-right-dialog
          @close="tooglePopupAccessRight"
          @selected="sendRecipientAccessRight"
        />
      </div>
    </DxPopup>
  </div>
</template>

<script>
import attachmentAccessRightDialog from "~/components/access-right/attachment-access-right-dialog.vue";
import { confirm } from "devextreme/ui/dialog";
import dataApi from "~/static/dataApi.js";
import DxButton from "devextreme-vue/button";
import { DxPopup } from "devextreme-vue/popup";
import startIcon from "~/static/icons/start.svg";
export default {
  components: {
    DxButton,
    DxPopup,
    attachmentAccessRightDialog
  },
  props: ["taskId"],
  inject: ["isValidTask"],
  data() {
    return {
      startIcon,
      isPopupAccesRight: false
    };
  },
  computed: {
    isDataChanged() {
      return this.$store.getters[`tasks/${this.taskId}/isDataChanged`];
    },
    task() {
      return this.$store.getters[`tasks/${this.taskId}/task`];
    }
  },
  methods: {
    async sendRecipientAccessRight(accessRightId) {
      await this.$axios.post(dataApi.task.GrantPermissions, {
        taskId: this.taskId,
        taskType: this.task.taskType,
        accessRight: accessRightId
      });

      await this.startTask();
      this.tooglePopupAccessRight();
    },

    tooglePopupAccessRight() {
      this.isPopupAccesRight = !this.isPopupAccesRight;
    },

    async checkRecipientAccessRight() {
      const {
        data: { succeeded }
      } = await this.$axios.get(
        `${dataApi.task.CheckMembersPermissions}${this.task?.taskType}/${this.taskId}`
      );
      if (!succeeded) {
        this.tooglePopupAccessRight();
        return false;
      } else return true;
    },
    async sureStartTaskConfirm() {
      const response = await confirm(
        this.$t("task.message.sureStartTask"),
        this.$t("shared.confirm")
      );
      return response;
    },
    async validateAndStart() {
      if (this.isValidTask()) {
        if (this.isDataChanged)
          await this.$store.dispatch(`tasks/${this.taskId}/save`);
        if (await this.sureStartTaskConfirm()) {
          const hasRecipientAccessRight = await this.checkRecipientAccessRight();
          if (!hasRecipientAccessRight) return false;

          this.startTask();
        }
      }
    },

    startTask() {
      this.$awn.asyncBlock(
        this.$store.dispatch(`tasks/${this.taskId}/start`),
        e => {
          this.$emit("onStart");
        },
        e => this.$awn.alert()
      );
    }
  }
};
</script>

<style>
.f-column {
  min-height: 150px;
  display: flex;
  flex-direction: column;
}
.js-space-between {
  align-items: flex-start;
  justify-content: space-between;
}
.fon-size-1-2em {
  font-size: 1.2em;
}
</style>
