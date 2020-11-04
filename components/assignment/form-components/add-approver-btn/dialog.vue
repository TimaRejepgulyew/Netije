<template>
  <form @submit.prevent="addApprover">
    <DxForm
      :scrolling-enabled="true"
      :show-colon-after-label="true"
      :show-validation-summary="false"
      validation-group="addApproverDialog"
    >
      <DxSimpleItem template="approver" data-field="approver">
        <DxRequiredRule :message="$t('assignment.fields.approverRequired')" />
        <DxLabel location="left" :text="$t('assignment.fields.approver')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="dated"
        :editor-options="datedOptions"
        editor-type="dxDateBox"
      >
        <DxLabel location="left" :text="$t('assignment.fields.newDeadline')" />
      </DxSimpleItem>
      <template #approver>
        <employee-select-box
          valueExpr="id"
          displayExpr="name"
          :value="approver"
          @valueChanged="onApproverChanged"
          validatorGroup="addApproverDialog"
        >
        </employee-select-box>
      </template>
      <DxGroupItem :col-count="15">
        <DxButtonItem
          :col-span="14"
          :button-options="saveButtonOptions"
          horizontal-alignment="right"
        />
        <DxButtonItem
          :button-options="closeButtonOptions"
          horizontal-alignment="right"
        />
      </DxGroupItem>
    </DxForm>
  </form>
</template>

<script>
import dataApi from "~/static/dataApi.js";
import DxForm, {
  DxSimpleItem,
  DxLabel,
  DxRequiredRule,
  DxButtonItem,
  DxGroupItem
} from "devextreme-vue/form";
import employeeSelectBox from "~/components/employee/custom-select-box.vue";
export default {
  components: {
    DxForm,
    DxSimpleItem,
    DxRequiredRule,
    DxLabel,
    DxButtonItem,
    DxGroupItem,
    employeeSelectBox
  },
  data() {
    return {
      closeButtonOptions: {
        text: this.$t("buttons.closed"),
        onClick: this.closeDialog
      },
      saveButtonOptions: {
        text: this.$t("buttons.add"),
        useSubmitBehavior: true
      },
      approver: null,
      deadline: this.$store.getters[
        `assignments/${this.assignmentId}/assignment`
      ].deadline
    };
  },
  props: ["assignmentId"],
  computed: {
    datedOptions() {
      return {
        type: "datetime",
        min: new Date().getTime(),
        value: this.deadline,
        onValueChanged: this.onApproverChanged
      };
    },
    inProcess() {
      return this.$store.getters[`assignments/${this.assignmentId}/inProcess`];
    },
    isRework() {
      return this.assignment.isRework;
    },
    addresseeId() {
      return this.assignment.addresseeId;
    },
    canUpdate() {
      return this.$store.getters[`assignments/${this.assignmentId}/canUpdate`];
    },
    assignment() {
      return this.$store.getters[`assignments/${this.assignmentId}/assignment`];
    }
  },
  methods: {
    addApprover() {
      this.$awn.asyncBlock(
        this.$axios.post(dataApi.assignment.AddApprover, {
          assignmentId: this.assignmentId,
          newDeadline: this.deadline,
          approver: this.approver
        }),
        () => {
          this.closeDialog();
          this.$awn.success();
        }
      );
    },
    closeDialog() {
      this.$emit("close");
    },
    onApproverChanged(e) {
      this.approver = e;
    },
    onDeadlineChanged(e) {
      this.deadline = e.value;
    }
  }
};
</script>

<style></style>
