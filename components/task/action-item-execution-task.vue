<template>
  <div id="form-demo">
    <DxForm
      ref="form"
      :col-count="1"
      :read-only="!isDraft"
      :show-colon-after-label="true"
      :show-validation-summary="false"
      :validation-group="validatorGroup"
    >
      <DxGroupItem :caption="$t('translations.fields.main')">
        <DxSimpleItem :editor-options="subjectOptions" data-field="subject">
          <DxLabel location="left" :text="$t('translations.fields.subjectTask')" />
          <DxRequiredRule :message="$t('translations.fields.subjectRequired')" />
        </DxSimpleItem>
        <DxGroupItem :col-count="5">
          <DxSimpleItem
            :col-span="2"
            data-field="isUnderControl"
            :editor-options="isUnderControlOptions"
            editor-type="dxCheckBox"
          >
            <DxLabel location="left" :text="$t('translations.fields.isUnderControl')" />
          </DxSimpleItem>
          <DxSimpleItem
            :col-span="3"
            :visible="isUnderControl"
            template="supervisor"
            data-field="supervisorId"
          >
            <DxLabel location="left" :text="$t('translations.fields.supervisorId')" />
            <DxRequiredRule :message="$t('translations.fields.supervisorIdRequired')" />
          </DxSimpleItem>
        </DxGroupItem>
        <DxGroupItem :col-count="2">
          <DxSimpleItem template="assignee" data-field="assigneeId">
            <DxRequiredRule :message="$t('translations.fields.assigneeIdRequired')" />
            <DxLabel location="left" :text="$t('translations.fields.assigneeId')" />
          </DxSimpleItem>
          <DxSimpleItem
            data-field="maxDeadline"
            :editor-options="maxDeadlineOptions"
            editor-type="dxDateBox"
          >
            <DxRequiredRule :message="$t('translations.fields.deadLineRequired')" />
            <DxLabel location="left" :text="$t('translations.fields.deadLine')" />
          </DxSimpleItem>

          <DxSimpleItem :col-span="2" template="coAssignees" data-field="coAssignees">
            <DxLabel location="left" :text="$t('translations.fields.coAssignees')" />
          </DxSimpleItem>

          <DxSimpleItem
            :col-span="2"
            template="actionItemObservers"
            data-field="actionItemObservers"
          >
            <DxLabel location="left" :text="$t('translations.fields.observers')" />
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
        <DxLabel location="left" :text="$t('translations.fields.actionItem')" />
        <DxRequiredRule :message="$t('translations.fields.actionItemRequired')" />
      </DxSimpleItem>
      <template #actionItemObservers>
        <employee-tag-box
          :read-only="!isDraft"
          :value="actionItemObservers"
          @valueChanged="setActionItemObservers"
        />
      </template>
      <template #coAssignees>
        <employee-tag-box
          :read-only="!isDraft"
          :value="coAssignees"
          @valueChanged="setCoAssignees"
        />
      </template>
      <template #supervisor>
        <employee-select-box
          :read-only="!isDraft"
          :validator-group="validatorGroup"
          :value="supervisorId"
          @valueChanged="setSupervisor"
        />
      </template>
      <template #assignee>
        <employee-select-box
          :read-only="!isDraft"
          :messageRequired="$t('translations.fields.assigneeIdRequired')"
          :validator-group="validatorGroup"
          :value="assigneeId"
          @valueChanged="setAssignee"
        />
      </template>
    </DxForm>
  </div>
</template>
<script>
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
    DxGroupItem,
    DxSimpleItem,
    DxRequiredRule,
    DxLabel,
    DxForm
  },
  props: ["taskId"],
  data() {
    return {
      validatorGroup: "task"
    };
  },
  methods: {
    setActionItemObservers(value) {
      this.$store.commit(`tasks/${this.taskId}/SET_ACTION_ITEM_OBSERVERS`, value);
    },
    setCoAssignees(value) {
      this.$store.commit(`tasks/${this.taskId}/SET_CO_ASSIGNEES`, value);
    },
    setAssignee(value) {
      this.$store.commit(`tasks/${this.taskId}/SET_ASSIGNEE`, value);
    },
    setSupervisor(value) {
      this.$store.commit(`tasks/${this.taskId}/SET_SUPERVISOR`, value);
    }
  },
  computed: {
    task() {
      return this.$store.getters[`tasks/${this.taskId}/task`];
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
    supervisorId() {
      return this.task.supervisorId;
    },
    assigneeId() {
      return this.task.assigneeId;
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
          this.$store.commit(`tasks/${this.taskId}/SET_IS_UNDER_CONTROL`, e.value);
          this.$store.commit(`tasks/${this.taskId}/SET_SUPERVISOR`, null);
        }
      };
    },
    bodyOptions() {
      return {
        placeholder: this.$t("translations.fields.actionItemRequired"),
        height: 250,
        value: this.task.body,
        onValueChanged: e => {
          this.$store.commit(`tasks/${this.taskId}/SET_BODY`, e.value);
        }
      };
    },
    maxDeadlineOptions() {
      return {
        type: "datetime",
        dateSerializationFormat: "yyyy-MM-ddTHH:mm:ss",
        value: this.task.maxDeadline,
        onValueChanged: e => {
          this.$store.commit(`tasks/${this.taskId}/SET_MAX_DEADLINE`, e.value);
        }
      };
    }
  }
};
</script>


