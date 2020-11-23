<template>
  <div>
    <DxButton
      :icon="abortIcon"
      :hint="$t('buttons.abort')"
      :text="$t('buttons.abort')"
      :on-click="togglePopup"
    />
    <DxPopup
      :title="$t('task.confirm.abortingReason')"
      :visible.sync="popupOpen"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="false"
      width="auto"
      :height="'auto'"
    >
      <div>
        <aborting-reason-dialog @abort="addReason" @cancel="togglePopup" />
      </div>
    </DxPopup>
  </div>
</template>

<script>
import abortingReasonDialog from "~/components/task/task-forms/components/aborting-reason-form.vue";
import abortIcon from "~/static/icons/stop.svg";
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
    attachmentAccessRightDialog,
    abortingReasonDialog
  },
  props: ["taskId"],
  inject: ["isValidTask"],
  data() {
    return {
      abortIcon,
      popupOpen: false
    };
  },
  computed: {
    task() {
      return this.$store.getters[`tasks/${this.taskId}/task`];
    }
  },
  methods: {
    addReason(abortingReason) {
      this.togglePopup();
      this.abortTask({ abortingReason });
    },
    abortTask({ abortingReason }) {
      this.$awn.asyncBlock(
        this.$store.dispatch(`tasks/${this.taskId}/abort`, { abortingReason }),
        e => {},
        e => this.$awn.alert()
      );
    },

    togglePopup() {
      this.popupOpen = !this.popupOpen;
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
