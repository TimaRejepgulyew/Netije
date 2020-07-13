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
          <DxLabel location="top" :text="$t('translations.fields.subjectTask')" />
          <DxRequiredRule :message="$t('translations.fields.subjectRequired')" />
        </DxSimpleItem>
        <DxGroupItem :col-count="5">
          <DxSimpleItem
            :col-span="2"
            data-field="isUnderControl"
            :editor-options="isUnderControlOptions"
            editor-type="dxCheckBox"
          >
            <DxLabel location="top" :text="$t('translations.fields.isUnderControl')" />
          </DxSimpleItem>
          <DxSimpleItem
            :col-span="3"
            :visible="isUnderControl"
            template="supervisor"
            data-field="supervisorId"
          >
            <DxLabel location="top" :text="$t('translations.fields.supervisorId')" />
            <DxRequiredRule :message="$t('translations.fields.supervisorIdRequired')" />
          </DxSimpleItem>
        </DxGroupItem>
        <DxGroupItem :col-count="2">
          <DxSimpleItem template="assignee" data-field="assigneeId">
            <DxRequiredRule :message="$t('translations.fields.assigneeIdRequired')" />
            <DxLabel location="top" :text="$t('translations.fields.assigneeId')" />
          </DxSimpleItem>
          <DxSimpleItem
            data-field="maxDeadline"
            :editor-options="maxDeadlineOptions"
            editor-type="dxDateBox"
          >
            <DxRequiredRule :message="$t('translations.fields.deadLineRequired')" />
            <DxLabel location="top" :text="$t('translations.fields.deadLine')" />
          </DxSimpleItem>

          <DxSimpleItem :col-span="2" template="coAssignees" data-field="coAssignees">
            <DxLabel location="top" :text="$t('translations.fields.coAssignees')" />
          </DxSimpleItem>

          <DxSimpleItem
            :col-span="2"
            template="actionItemObservers"
            data-field="actionItemObservers"
          >
            <DxLabel location="top" :text="$t('translations.fields.observers')" />
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
        <DxLabel location="top" :text="$t('translations.fields.actionItem')" />
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
      this.$store.commit("currentTask/SET_ACTION_ITEM_OBSERVERS", {
        key: this.taskId,
        payload: value
      });
    },
    setCoAssignees(value) {
      this.$store.commit("currentTask/SET_CO_ASSIGNEES", {
        key: this.taskId,
        payload: value
      });
    },
    setAssignee(value) {
      this.$store.commit("currentTask/SET_ASSIGNEE", {
        key: this.taskId,
        payload: value
      });
    },
    setSupervisor(value) {
      this.$store.commit("currentTask/SET_SUPERVISOR", {
        key: this.taskId,
        payload: value
      });
    }
  },
  computed: {
    isUnderControl() {
      return this.$store.getters["currentTask/task"](this.taskId).isUnderControl;
    },
    actionItemObservers() {
      return this.$store.getters["currentTask/task"](this.taskId)
        .actionItemObservers;
    },
    coAssignees() {
      return this.$store.getters["currentTask/task"](this.taskId).coAssignees;
    },
    supervisorId() {
      return this.$store.getters["currentTask/task"](this.taskId).supervisorId;
    },
    assigneeId() {
      return this.$store.getters["currentTask/task"](this.taskId).assigneeId;
    },
    inProcess() {
      return this.$store.getters["currentTask/inProcess"](this.taskId);
    },
    isNew() {
      return this.$store.getters["currentTask/isNew"](this.taskId);
    },
    isDraft() {
      return this.$store.getters["currentTask/isDraft"](this.taskId);
    },
    subjectOptions() {
      return {
        value: this.$store.getters["currentTask/task"](this.taskId).subject,
        onValueChanged: e => {
          this.$store.commit("currentTask/SET_SUBJECT", {
            key: this.taskId,
            payload: e.value
          });
        }
      };
    },
    isUnderControlOptions() {
      return {
        value: this.$store.getters["currentTask/task"](this.taskId).isUnderControl,
        onValueChanged: e => {
          this.$store.commit("currentTask/SET_IS_UNDER_CONTROL", {
            key: this.taskId,
            payload: e.value
          });
          this.$store.commit("currentTask/SET_SUPERVISOR", {
            key: this.taskId,
            payload: null
          });
        }
      };
    },
    bodyOptions() {
      return {
        placeholder: this.$t("translations.fields.actionItemRequired"),
        height: 250,
        value: this.$store.getters["currentTask/task"](this.taskId).body,
        onValueChanged: e => {
          this.$store.commit("currentTask/SET_BODY", {
            key: this.taskId,
            payload: e.value
          });
        }
      };
    },
    maxDeadlineOptions() {
      return {
        type: "datetime",
        dateSerializationFormat: "yyyy-MM-ddTHH:mm:ss",
        value: this.$store.getters["currentTask/task"](this.taskId).maxDeadline,
        onValueChanged: e => {
          this.$store.commit("currentTask/SET_MAX_DEADLINE", {
            key: this.taskId,
            payload: e.value
          });
        }
      };
    }
  }
};
</script>


