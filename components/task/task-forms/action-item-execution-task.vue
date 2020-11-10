<template>
  <div id="form-demo">
    <DxForm
      ref="form"
      :col-count="1"
      :read-only="readOnly"
      :show-colon-after-label="true"
      :show-validation-summary="false"
      :validation-group="taskValidatorName"
    >
      <DxGroupItem>
        <DxSimpleItem :editor-options="subjectOptions" data-field="subject">
          <DxLabel location="left" :text="$t('task.fields.subjectTask')" />
          <DxRequiredRule :message="$t('task.validation.subjectRequired')" />
        </DxSimpleItem>
        <DxGroupItem :col-count="5">
          <DxGroupItem :col-span="5" :col-count="2">
            <DxSimpleItem data-field="assignedBy" template="assignedBy">
              <DxLabel location="left" :text="$t('task.fields.assignedBy')" />
              <DxRequiredRule
                :message="$t('task.validation.assignedByRequired')"
              />
            </DxSimpleItem>

            <DxSimpleItem
              data-field="isUnderControl"
              :editor-options="isUnderControlOptions"
              editor-type="dxCheckBox"
            >
              <DxLabel
                location="left"
                :text="$t('task.fields.isUnderControl')"
              />
            </DxSimpleItem>

            <DxSimpleItem
              :col-span="2"
              :visible="isUnderControl"
              template="supervisor"
              data-field="supervisor"
            >
              <DxLabel location="left" :text="$t('task.fields.supervisor')" />
              <DxRequiredRule
                :message="$t('task.validation.supervisorRequired')"
              />
            </DxSimpleItem>
          </DxGroupItem>
        </DxGroupItem>
        <DxGroupItem :col-span="5" :template="isCompoundActionItem" />
        <DxGroupItem :col-count="2">
          <DxSimpleItem
            :col-span="2"
            template="actionItemObservers"
            data-field="actionItemObservers"
          >
            <DxLabel location="left" :text="$t('task.fields.observers')" />
          </DxSimpleItem>
        </DxGroupItem>
      </DxGroupItem>
      <DxSimpleItem
        :visible="isDraft"
        :col-span="3"
        data-field="body"
        :editor-options="bodyOptions"
        editor-type="dxTextArea"
      >
        <DxLabel location="left" :text="$t('task.fields.actionItem')" />
        <DxRequiredRule :message="$t('task.validation.actionItemRequired')" />
      </DxSimpleItem>
      <template #assignedBy>
        <employee-select-box
          :messageRequired="$t('task.validation.supervisorRequired')"
          :validator-group="taskValidatorName"
          :storeApi="assignedByStore"
          :read-only="readOnly"
          :value="assignedBy"
          @valueChanged="setAssignedBy"
        />
      </template>
      <template #actionItemObservers>
        <recipient-tag-box
          :read-only="readOnly"
          :recipients="actionItemObservers"
          @setRecipients="setActionItemObservers"
        />
      </template>
      <template #coAssignees>
        <employee-tag-box
          :read-only="readOnly"
          :value="coAssignees"
          @valueChanged="setCoAssignees"
        />
      </template>
      <template #supervisor>
        <employee-select-box
          :read-only="readOnly"
          :messageRequired="$t('task.validation.supervisorRequired')"
          :validator-group="taskValidatorName"
          :value="supervisor"
          @valueChanged="setSupervisor"
        />
      </template>
      <template #assignee>
        <employee-select-box
          :read-only="readOnly"
          :messageRequired="$t('task.validation.assigneeRequired')"
          :validator-group="taskValidatorName"
          :value="assignee"
          @valueChanged="setAssignee"
        />
      </template>
    </DxForm>
  </div>
</template>
<script>
import recipientTagBox from "~/components/page/recipient-tag-box.vue";
import employeeSelectBox from "~/components/employee/custom-select-box.vue";
import employeeTagBox from "~/components/employee/custom-tag-box.vue";
import "devextreme-vue/text-area";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
  DxRequiredRule
} from "devextreme-vue/form";
import dataApi from "~/static/dataApi";

export default {
  components: {
    employeeSelectBox,
    employeeTagBox,
    recipientTagBox,
    DxGroupItem,
    DxSimpleItem,
    DxRequiredRule,
    DxLabel,
    DxForm
  },
  props: ["taskId", "canUpdate"],
  inject: ["taskValidatorName"],
  data() {
    return {
      assignedByStore: `${dataApi.task.actionItemExecution.GetAvailableProducers}${this.taskId}`
    };
  },
  inject: ["taskValidatorName"],
  methods: {
    setActionItemObservers(value) {
      this.$store.commit(
        `tasks/${this.taskId}/SET_ACTION_ITEM_OBSERVERS`,
        value
      );
    },
    setCoAssignees(value) {
      this.$store.commit(`tasks/${this.taskId}/SET_CO_ASSIGNEES`, value);
    },
    setAssignee(value) {
      this.$store.commit(`tasks/${this.taskId}/SET_ASSIGNEE`, value);
    },
    setSupervisor(value) {
      this.$store.commit(`tasks/${this.taskId}/SET_SUPERVISOR`, value);
    },
    setAssignedBy(value) {
      this.$store.commit(`tasks/${this.taskId}/SET_ASSIGNED_BY`, value);
    }
  },
  computed: {
    isCompountActionItem() {
      return this.task.isCompountActionItem;
    },
    readOnly() {
      return !this.isDraft || !this.canUpdate;
    },
    task() {
      return this.$store.getters[`tasks/${this.taskId}/task`];
    },
    assignedBy() {
      return this.task.assignedBy;
    },
    isUnderControl() {
      return this.task.isUnderControl;
    },
    actionItemObservers() {
      return this.task.actionItemObservers;
    },
    coAssignees() {
      return this.task.coAssignees;
    },
    supervisor() {
      return this.task.supervisor;
    },
    assignee() {
      return this.task.assignee;
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
        onValueChanged: e => {
          this.$store.commit(`tasks/${this.taskId}/SET_SUBJECT`, e.value);
        }
      };
    },
    isUnderControlOptions() {
      return {
        value: this.task.isUnderControl,
        onValueChanged: e => {
          this.$store.commit(
            `tasks/${this.taskId}/SET_IS_UNDER_CONTROL`,
            e.value
          );
          this.$store.commit(`tasks/${this.taskId}/SET_SUPERVISOR`, null);
        }
      };
    },
    bodyOptions() {
      return {
        placeholder: this.$t("task.validation.actionItemRequired"),
        height: 250,
        value: this.task.body,
        onValueChanged: e => {
          this.$store.dispatch(`tasks/${this.taskId}/setBody`, e.value);
        }
      };
    },
    deadlineOptions() {
      return {
        type: "datetime",
        dateSerializationFormat: "yyyy-MM-ddTHH:mm:ss",
        value: this.task.deadline,
        onValueChanged: e => {
          this.$store.commit(`tasks/${this.taskId}/SET_DEADLINE`, e.value);
        }
      };
    }
  }
};
</script>
