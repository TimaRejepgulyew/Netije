<template>
  <div>
    <DxButton
      :icon="addApproverBtnIcon"
      :hint="$t('buttons.addApprover')"
      :text="$t('buttons.addApprover')"
      :on-click="toggleDialog"
    />
    <DxPopup
      :title="$t('assignment.addApprover')"
      :visible.sync="openDialog"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      width="auto"
      height="auto"
    >
      <div>
        <approveDialog
          v-if="openDialog"
          :assignmentId="assignmentId"
          @close="toggleDialog"
        />
      </div>
    </DxPopup>
  </div>
</template>

<script>
import approveDialog from "./dialog.vue";
import dataApi from "~/static/dataApi.js";
import DxButton from "devextreme-vue/button";
import { DxPopup } from "devextreme-vue/popup";
import addApproverBtnIcon from "~/static/icons/assignment-result/addApprover.svg";
export default {
  components: {
    DxButton,
    DxPopup,
    approveDialog
  },
  props: ["assignmentId"],
  data() {
    return {
      addApproverBtnIcon,
      openDialog: false
    };
  },
  methods: {
    toggleDialog() {
      this.openDialog = !this.openDialog;
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
