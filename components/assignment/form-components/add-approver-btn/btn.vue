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
      :show-title="false"
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

import addApproverBtnIcon from "~/static/icons/assignment-result/addApprover.svg";
export default {
  components: {
    DxButton,
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


