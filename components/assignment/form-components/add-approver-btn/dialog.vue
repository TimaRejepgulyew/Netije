<template>
  <form @submit.prevent="addApprover">
    <div>
      <label class="pr-2">{{ $t("assignment.fields.approver") }}</label>
      <div class="f-grow-1">
        <employee-select-box
          valueExpr="id"
          displayExpr="name"
          dataSource="employeeStore"
          :value="approver"
          @valueChanged="onApproverChanged"
        >
          <DxValidator validationGroup="addApproverDialog">
            <DxRequiredRule :message="placeholder" />
          </DxValidator>
        </employee-select-box>
      </div>
    </div>
    <div class="d-flex align-center">
      <label class="control__label align-content-center" for="newDeadLine">{{
        $t("assignment.fields.newDeadline")
      }}</label>
      <div class="f-grow-1">
        <DxDateBox
          :readOnly="!inProcess || !canUpdate"
          type="datetime"
          name="newDeadLine"
          :min="new Date().getTime()"
          :value.sync="deadline"
          @valueChanged="onDeadlineChanged"
          styling-mode="outlined"
        ></DxDateBox>
      </div>
    </div>
    <DxButton
      :hint="$t('buttons.add')"
      :useSubmitBehavior="true"
      :text="$t('buttons.add')"
    />
    <DxButton
      :hint="$t('buttons.close')"
      :text="$t('buttons.close')"
      :on-click="closeDialog"
    />
  </form>
</template>

<script>
import dataApi from "~/static/dataApi.js";
import DxButton from "devextreme-vue/button";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import employeeSelectBox from "~/components/employee/custom-select-box.vue";

export default {
  components: {
    DxValidator,
    DxRequiredRule,
    employeeSelectBox,
    DxButton
  },
  data() {
    return {
      approver: null,
      deadline: this.$store.getters[
        `assignments${this.assignmentId}/assignment`
      ].deadline
    };
  },
  props: ["assignmentId"],
  methods: {
    addApprover() {
      this.$awn(
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
      this.approver = e.value;
    },
    onDeadlineChanged(e) {
      this.deadline = e.value;
    }
  }
};
</script>

<style></style>
