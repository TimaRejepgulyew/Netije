<template>
  <DxForm :show-colon-after-label="true" :show-validation-summary="false">
    <DxSimpleItem
      editor-type="dxSelectBox"
      data-field="lifeCycleState"
      :editor-options="lifeCycleStateOptions"
    >
      <DxRequiredRule :message="$t('document.validation.stateRequired')" />
      <DxLabel location="left" :text="$t('document.state')" />
    </DxSimpleItem>

    <DxSimpleItem
      v-if="itemVisible.registrationState"
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
import DocumentType from "~/infrastructure/constants/documentType.js";
import generateLifeCycleItemState from "~/infrastructure/services/documentLifeCyclegenerator.js";
import { InternalApprovalStateStore } from "~/infrastructure/constants/internalApprovalState.js";
import { RegistrationStateStore } from "~/infrastructure/constants/documentRegistrationState.js";
import { ExternalApprovalStateStore } from "~/infrastructure/constants/externalApprovalState.js";
import { ExecutionStateStore } from "~/infrastructure/constants/executionState.js";
import { ControlExecutionStateStore } from "~/infrastructure/constants/controlExecutionState.js";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxRequiredRule,
  DxLabel,
} from "devextreme-vue/form";
import dataApi from "~/static/dataApi";
export default {
  components: {
    DxGroupItem,
    DxSimpleItem,
    DxRequiredRule,
    DxLabel,
    DxForm,
  },
  props: ["documentId"],
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
  created() {
    this.showLifeCycleItemByTypeGuid();
  },
  methods: {
    showLifeCycleItemByTypeGuid() {
      switch (this.documentTypeGuid) {
        case DocumentType.IncomingLetter:
          this.itemVisible.registrationState = true;
          this.itemVisible.executionState = true;
          this.itemVisible.controlExecutionState = true;
          break;
        case DocumentType.OutgoingLetter:
          this.itemVisible.registrationState = true;
          this.itemVisible.internalApprovalState = true;
          break;
        case DocumentType.Order:
        case DocumentType.CompanyDirective:
          this.itemVisible.registrationState = true;
          this.itemVisible.executionState = true;
          this.itemVisible.controlExecutionState = true;
          this.itemVisible.internalApprovalState = true;
          break;
        case DocumentType.Order:
        case DocumentType.SimpleDocument:
          this.itemVisible.executionState = true;
          this.itemVisible.controlExecutionState = true;
          this.itemVisible.internalApprovalState = true;
          break;
        case DocumentType.IncomingTaxInvoice:
        case DocumentType.Addendum:
          break;
        case DocumentType.ContractStatement:
        case DocumentType.Contract:
          this.itemVisible.registrationState = true;
          this.itemVisible.internalApprovalState = true;
          this.itemVisible.externalApprovalState = true;
          break;
        case DocumentType.OutgoingTaxInvoice:
        case DocumentType.IncomingInvoice:
        case DocumentType.PowerOfAttorney:
        case DocumentType.Memo:
          this.itemVisible.internalApprovalState = true;
          break;
        case DocumentType.Waybill:
        case DocumentType.SupAgreement:
        case DocumentType.UniversalTransferDocument:
          this.itemVisible.internalApprovalState = true;
          this.itemVisible.externalApprovalState = true;
          break;
      }
    },
  },
  computed: {
    canUpdate() {
      return this.$store.getters[`documents/${this.documentId}/canUpdate`];
    },
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
    documentTypeGuid() {
      return this.document.documentTypeGuid;
    },
    lifeCycleStateOptions() {
      return {
        readOnly: !this.canUpdate,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        onValueChanged: (e) => {
          this.$store.commit(
            `documents/${this.documentId}/SET_LIFE_CYCLE_STATE`,
            e.value
          );
        },
        value: this.document.lifeCycleState,
        dataSource: generateLifeCycleItemState(this, this.documentTypeGuid),
      };
    },
    registrationStateOptions() {
      return {
        visible: this.itemVisible.registrationState,
        readOnly: true,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        value: this.document.registrationState,
        dataSource: RegistrationStateStore(this),
      };
    },
    internalApprovalStateOptions() {
      return {
        readOnly: !this.canUpdate,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        onValueChanged: (e) => {
          this.$store.commit(
            `documents/${this.documentId}/SET_INTERNAL_APPROVAL_STATE`,
            e.value
          );
        },
        value: this.document.internalApprovalState,
        dataSource: InternalApprovalStateStore(this),
      };
    },
    externalApprovalStateOptions() {
      return {
        readOnly: !this.canUpdate,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        onValueChanged: (e) => {
          this.$store.commit(
            `documents/${this.documentId}/SET_EXTERNAL_APPROVAL_STATE`,
            e.value
          );
        },
        value: this.document.externalApprovalState,
        dataSource: ExternalApprovalStateStore(this),
      };
    },
    executionStateOptions() {
      return {
        readOnly: !this.canUpdate,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        onValueChanged: (e) => {
          this.$store.commit(
            `documents/${this.documentId}/SET_EXECUTION_STATE`,
            e.value
          );
        },
        value: this.document.executionState,
        dataSource: ExecutionStateStore(this),
      };
    },
    controlExecutionStateOptions() {
      return {
        readOnly: !this.canUpdate,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        onValueChanged: (e) => {
          this.$store.commit(
            `documents/${this.documentId}/SET_CONTROL_EXECUTION_STATE`,
            e.value
          );
        },
        value: this.document.controlExecutionState,
        dataSource: ControlExecutionStateStore(this),
      };
    },
  },
};
</script>
