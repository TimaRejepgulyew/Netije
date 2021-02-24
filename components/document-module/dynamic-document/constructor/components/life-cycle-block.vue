<template>
  <DxForm
    :show-colon-after-label="true"
    :readOnly="readOnly"
    :show-validation-summary="false"
  >
    <DxSimpleItem
      editor-type="dxSelectBox"
      data-field="lifeCycleState"
      :editor-options="lifeCycleStateOptions"
    >
      <DxRequiredRule :message="$t('document.validation.stateRequired')" />
      <DxLabel location="left" :text="$t('document.state')" />
    </DxSimpleItem>

    <DxSimpleItem
      data-field="registrationState"
      :editor-options="registrationStateOptions"
      editor-type="dxSelectBox"
    >
      <DxLabel location="left" :text="$t('document.registrationState')" />
    </DxSimpleItem>

    <DxSimpleItem
      v-if="itemVisible.internalApprovalState"
      data-field="internalApprovalState"
      :editor-options="internalApprovalStateOptions"
      editor-type="dxSelectBox"
    >
      <DxLabel location="left" :text="$t('document.internalApprovalState')" />
    </DxSimpleItem>
    <DxSimpleItem
      v-if="itemVisible.externalApprovalState"
      data-field="externalApprovalState"
      :editor-options="externalApprovalStateOptions"
      editor-type="dxSelectBox"
    >
      <DxLabel location="left" :text="$t('document.externalApprovalState')" />
    </DxSimpleItem>

    <DxSimpleItem
      v-if="itemVisible.executionState"
      data-field="executionState"
      :editor-options="executionStateOptions"
      editor-type="dxSelectBox"
    >
      <DxLabel location="left" :text="$t('document.executionState')" />
    </DxSimpleItem>
    <DxSimpleItem
      v-if="itemVisible.executionState"
      data-field="controlExecutionState"
      :editor-options="controlExecutionStateOptions"
      editor-type="dxSelectBox"
    >
      <DxLabel location="left" :text="$t('document.controlExecutionState')" />
    </DxSimpleItem>
  </DxForm>
</template>
<script>
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxRequiredRule,
  DxLabel,
} from "devextreme-vue/form";
export default {
  components: {
    DxGroupItem,
    DxSimpleItem,
    DxRequiredRule,
    DxLabel,
    DxForm,
  },
  props: ["readOnly"],
  data() {
    return {
      itemVisible: {
        lifeCycleState: true,
        registrationState: false,
        internalApprovalState: false,
        externalApprovalState: false,
        executionState: false,
        controlExecutionState: false,
      },
    };
  },
  computed: {
    lifeCycleStateOptions() {
      return {
        readOnly: this.readOnly,
      };
    },
    registrationStateOptions() {
      return {
        readOnly: this.readOnly,
      };
    },
    internalApprovalStateOptions() {
      return {
        readOnly: this.readOnly,
      };
    },
    externalApprovalStateOptions() {
      return {
        readOnly: this.readOnly,
      };
    },
    executionStateOptions() {
      return {
        readOnly: this.readOnly,
      };
    },
    controlExecutionStateOptions() {
      return {
        readOnly: this.readOnly,
      };
    },
  },
};
</script>
