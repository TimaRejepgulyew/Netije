<template>
  <form action="your-action" @submit.prevent="addApprover">
    <div class="d-flex align-center">
      <label class="pr-2">{{ $t("assignment.fields.approver") }}</label>
      <div class="f-grow-1">
        <employee-select-box
          valueExpr="id"
          displayExpr="name"
          :value="approver"
          @valueChanged="onApproverChanged"
          validationGroup="addApproverDialog"
        >
          <!-- <DxValidator validationGroup="addApproverDialog">
            <DxRequiredRule :message="placeholder" />
          </DxValidator> -->
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
    <div class="d-flex justify-flex-end">
      <DxButton
        :hint="$t('buttons.add')"
        :useSubmitBehavior="true"
        :text="$t('buttons.add')"
      />
      <DxButton
        :hint="$t('buttons.closed')"
        :text="$t('buttons.closed')"
        :on-click="closeDialog"
      />
    </div>
  </form>
</template>

<script>
import dataApi from "~/static/dataApi.js";
import DxButton from "devextreme-vue/button";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import employeeSelectBox from "~/components/employee/custom-select-box.vue";
import {
  DxDateBox,
  DxButton as DxDateBoxButton
} from "devextreme-vue/date-box";
export default {
  components: {
    DxValidator,
    DxRequiredRule,
    employeeSelectBox,
    DxButton,
    DxDateBox,
    DxDateBoxButton
  },
  data() {
    return {
      approver: null,
      deadline: this.$store.getters[
        `assignments/${this.assignmentId}/assignment`
      ].deadline
    };
  },
  props: ["assignmentId"],
  computed: {
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
