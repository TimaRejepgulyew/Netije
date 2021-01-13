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
        <DxSimpleItem :editor-options="subjectOptions" data-field="subject">
          <DxLabel location="left" :text="$t('task.fields.subjectTask')" />
        </DxSimpleItem>
        <DxSimpleItem
          :col-span="5"
          editor-type="dxSelectBox"
          :editor-options="counterPartyOptions"
          data-field="counterparty"
        >
          <DxLabel location="left" :text="$t('task.fields.counterParty')" />
        </DxSimpleItem>
        <DxSimpleItem
          :col-span="5"
          editor-type="dxSelectBox"
          :editor-options="boxBaseIdOptions"
          data-field="boxBaseId"
        >
          <DxLabel location="left" :text="$t('task.fields.boxBase')" />
        </DxSimpleItem>
        <DxSimpleItem
          data-field="deadline"
          :editor-options="deadlineOptions"
          editor-type="dxDateBox"
        >
          <DxLabel location="left" :text="$t('task.fields.deadLine')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="assignee" template="assignee">
          <DxLabel location="left" :text="$t('task.fields.assignee')" />
        </DxSimpleItem>
      </DxGroupItem>
      <template #assignee>
        <employee-select-box :read-only="readOnly" :value="assignee" />
      </template>
    </DxForm>
  </div>
</template>
<script>
import businessUnitSelectBox from "~/components/company/organization-structure/business-unit/custom-select-box.vue";
import employeeSelectBox from "~/components/employee/custom-select-box.vue";
import "devextreme-vue/text-area";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
} from "devextreme-vue/form";
import dataApi from "~/static/dataApi";
import DataSource from "devextreme/data/data_source";
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
        readOnly: true,
        value: this.task.subject,
      };
    },
    deadlineOptions() {
      return {
        readOnly: this.readOnly,
        type: "datetime",
        dateSerializationFormat: "yyyy-MM-ddTHH:mm:ss",
        value: this.task.deadline,
        useMaskBehavior: true,
        openOnFieldClick: true,
      };
    },
    boxBaseIdOptions() {
      return {
        readOnly: true,
        dataSource: this.$dxStore({
          key: "id",
          ladUrl: dataApi.boxes.Boxes,
        }),
        value: this.task.boxBaseId,
        displayExpr: "name",
        valueExpr: "id",
      };
    },
    counterPartyOptions() {
      return {
        readOnly: true,
        dataSource: this.$dxStore({
          key: "id",
          loadUrl: dataApi.contragents.CounterPart,
        }),
        value: this.task.counterparty,
        displayExpr: "name",
      };
    },
  },
};
</script>
