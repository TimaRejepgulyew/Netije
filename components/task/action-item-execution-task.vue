<template>
  <div id="form-demo">
    <DxForm
      ref="form"
      :col-count="1"
      :read-only="false"
      :show-colon-after-label="true"
      :show-validation-summary="false"
      :validation-group="validatorGroup"
    >
      <DxGroupItem :caption="$t('translations.fields.main')">
        <DxSimpleItem :col-span="9" data-field="subject">
          <DxLabel
            location="top"
            :editor-options="subjectOptions"
            :text="$t('translations.fields.subjectTask')"
          />
          <DxRequiredRule :message="$t('translations.fields.subjectRequired')" />
        </DxSimpleItem>
        <DxGroupItem :col-count="2">
          <DxSimpleItem template="assignee" data-field="assigneeId">
            <DxRequiredRule :message="$t('translations.fields.assigneeIdRequired')" />
            <DxLabel location="top" :text="$t('translations.fields.assigneeId')" />
          </DxSimpleItem>
          <DxSimpleItem
            data-field="deadline"
            :editor-options="deadlineOptions"
            editor-type="dxDateBox"
          >
            <DxRequiredRule :message="$t('translations.fields.deadLineRequired')" />
            <DxLabel location="top" :text="$t('translations.fields.deadLine')" />
          </DxSimpleItem>
          <DxSimpleItem template="supervisor" editor-type="dxSelectBox" data-field="supervisorId">
            <DxLabel location="top" :text="$t('translations.fields.supervisorId')" />
          </DxSimpleItem>

          <DxSimpleItem template="coAssignees" editor-type="dxTagBox" data-field="coAssignees">
            <DxLabel location="top" :text="$t('translations.fields.coAssignees')" />
          </DxSimpleItem>

          <DxSimpleItem
            template="actionItemObservers"
            editor-type="dxTagBox"
            data-field="actionItemObservers"
          >
            <DxLabel location="top" :text="$t('translations.fields.observers')" />
          </DxSimpleItem>
        </DxGroupItem>
      </DxGroupItem>

      <DxSimpleItem
        :col-span="3"
        data-field="actionItem"
        :editor-options="actionItemOptions"
        editor-type="dxTextArea"
      >
        <DxLabel location="top" :text="$t('translations.fields.actionItem')" />
        <DxRequiredRule :message="$t('translations.fields.actionItemRequired')" />
      </DxSimpleItem>
      <template #actionItemObservers="actionItemObservers">
        <employee-tag-box
          :value="actionItemObservers.data.editorOptions.value"
          @valueChanged="setActionItemObservers"
        />
      </template>
      <template #coAssignees="coAssignees">
        <employee-tag-box
          :value="coAssignees.data.editorOptions.value"
          @valueChanged="setCoAssigneess"
        />
      </template>
      <template #supervisor="supervisor">
        <employee-select-box
          :value="supervisor.data.editorOptions.value"
          @valueChanged="setSupervisor"
        />
      </template>
      <template #assignee="assignee">
        <employee-select-box
          :messageRequired="$t('translations.fields.assigneeIdRequired')"
          :validator-group="validatorGroup"
          :value="assignee.data.editorOptions.value"
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
  data() {
    return {
      validatorGroup: "task"
    };
  },
  methods: {
    setActionItemObservers(value) {
      this.$store.commit("currentTask/SET_ACTION_ITEM_OBSERVERS", value);
    },
    setCoAssigneess(value) {
      this.$store.commit("currentTask/SET_CO_ASSIGNEESS", value);
    },
    setAssignee(value) {
      this.$store.commit("currentTask/SET_ASSIGNEE", value);
    },
    setSupervisor(value) {
      this.$store.commit("currentTask/SET_SUPERVISOR", value);
    }
  },
  computed: {
    isNew() {
      return this.$store.getters["currentTask/isNew"];
    },
    isDraft() {
      return this.$store.getters["currentTask/isDraft"];
    },
    subjectOptions() {
      return {
        value: this.$store.getters["currentTask/task"].subject,
        onValueChanged: e => {
          this.$store.commit("currentTask/SET_SUBJECT", e.value);
        }
      };
    },
    actionItemOptions() {
      return {
        placeholder: this.$t("translations.fields.actionItemRequired"),
        height: 250,
        value: this.$store.getters["currentTask/task"].actionItem,
        onValueChanged: e => {
          this.$store.commit("currentTask/SET_ACTION_ITEM", e.value);
        }
      };
    },
    deadlineOptions() {
      return {
        type: "datetime",
        dateSerializationFormat: "yyyy-MM-ddTHH:mm:ss",
        value: this.$store.getters["currentTask/task"].deadline,
        onValueChanged: e => {
          this.$store.commit("currentTask/SET_DEADLINE", e.value);
        }
      };
    }
  }
};
</script>


