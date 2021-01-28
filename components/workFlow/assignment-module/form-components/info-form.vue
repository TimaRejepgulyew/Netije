<template>
  <div>
    <DxForm
      ref="form"
      :form-data.sync="assignment"
      :show-colon-after-label="true"
      :show-validation-summary="true"
    >
      <DxSimpleItem :editor-options="subjectOptions" data-field="subject">
        <DxLabel location="left" :text="$t('assignment.fields.subject')" />
      </DxSimpleItem>
      <DxGroupItem :col-count="3">
        <DxSimpleItem
          data-field="deadline"
          :editor-options="dateTimeOptions"
          editor-type="dxDateBox"
        >
          <DxLabel location="left" :text="$t('translations.fields.deadLine')" />
        </DxSimpleItem>
        <DxSimpleItem template="author" data-field="author">
          <DxLabel location="left" :text="$t('shared.from')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="performer" template="performer">
          <DxLabel location="left" :text="$t('shared.whom')" />
        </DxSimpleItem>
      </DxGroupItem>

      <template #author>
        <employee-select-box
          :value="author"
          :readOnly="true"
        />
      </template>
      <template #performer>
        <employee-select-box
          :readOnly="true"
          :value="performer"
        />
      </template>
    </DxForm>
  </div>
</template>
<script>
import employeeSelectBox from "~/components/employee/custom-select-box.vue";
import dataApi from "~/static/dataApi";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
} from "devextreme-vue/form";
export default {
  components: {
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxForm,
    employeeSelectBox,
  },
  name: "info-form",
  props: ["assignmentId"],
  computed: {
    assignment() {
      return this.$store.getters[`assignments/${this.assignmentId}/assignment`];
    },
    performer() {
      return this.assignment.performer;
    },
    author() {
      return this.assignment.author;
    },
    subjectOptions() {
      return {
        readOnly: true,
      };
    },
    dateTimeOptions() {
      return {
        readOnly: true,
        type: "datetime",
      };
    },
  },
};
</script>
