<template>
  <div id="form-demo">
    <DxForm
      ref="form"
      :scrolling-enabled="true"
      :read-only="readOnly"
      :show-colon-after-label="true"
      :show-validation-summary="true"
      :validation-group="taskValidatorName"
    >
      <DxGroupItem>
        <DxSimpleItem
          :editor-options="subjectOptions"
          :col-span="10"
          data-field="subject"
          editor-type="dxTextArea"
        >
          <DxLabel location="left" :text="$t('task.fields.subjectTask')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="assignee" template="assignee">
          <DxLabel location="left" :text="$t('task.fields.assignee')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="sender" template="sender">
          <DxLabel location="left" :text="$t('task.fields.sender')" />
        </DxSimpleItem>
      </DxGroupItem>
      <template #assignee>
        <employee-select-box :read-only="readOnly" :value="assignee" />
      </template>
      <template #sender>
        <business-unit-select-box :read-only="readOnly" :value="sender" />
      </template>
    </DxForm>
  </div>
</template>
<script>
import businessUnitSelectBox from "~/components/company/organization-structure/business-unit/custom-select-box.vue";
import employeeSelectBox from "~/components/employee/custom-select-box.vue";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
} from "devextreme-vue/form";
import "devextreme/ui/text_area";
export default {
  components: {
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxForm,
    employeeSelectBox,
    businessUnitSelectBox,
  },
  props: ["taskId", "canUpdate"],
  inject: ["taskValidatorName"],
  computed: {
    readOnly() {
      return !this.isDraft || !this.canUpdate;
    },
    task() {
      return this.$store.getters[`tasks/${this.taskId}/task`];
    },
    assignee() {
      return this.task.assignee;
    },
    sender() {
      return this.task.sender;
    },
    inProcess() {
      return this.$store.getters[`tasks/${this.taskId}/inProcess`];
    },
    isNew() {
      return this.$store.getters[`tasks${this.taskId}/isNew`];
    },
    isDraft() {
      return this.$store.getters[`tasks/${this.taskId}/isDraft`];
    },
    subjectOptions() {
      return {
        autoResizeEnabled: true,
        readOnly: true,
        value: this.task.subject,
      };
    },
  },
};
</script>
