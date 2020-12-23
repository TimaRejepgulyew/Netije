<template>
  <div>
    <DxForm
      ref="form"
      :form-data.sync="assignment"
      :show-colon-after-label="true"
      :show-validation-summary="true"
      :validation-group="assignmentValidatorName"
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
        <DxSimpleItem template="authorId" data-field="authorId">
          <DxLabel location="left" :text="$t('shared.from')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="performerId" template="performerId">
          <DxLabel location="left" :text="$t('shared.whom')" />
        </DxSimpleItem>
      </DxGroupItem>

      <template #authorId>
        <employee-select-box
          valueExpr="id"
          :value="authorId"
          :readOnly="true"
        />
      </template>
      <template #performerId>
        <employee-select-box
          valueExpr="id"
          :readOnly="true"
          :value="performerId"
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
  inject: ["assignmentValidatorName", "isValidForm"],
  computed: {
    assignment() {
      return this.$store.getters[`assignments/${this.assignmentId}/assignment`];
    },
    performerId() {
      return this.assignment.performerId;
    },
    authorId() {
      return this.assignment.authorId;
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
<style scoped>
.comments {
  overflow: auto;
  max-height: 50vh;
}
@media screen and (min-device-height: 910px) {
  .comments {
    max-height: 60vh;
  }
}
</style>
