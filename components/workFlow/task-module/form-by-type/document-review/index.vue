<template>
  <div id="form-demo">
    <DxForm
      ref="form"
      :read-only="readOnly"
      :show-colon-after-label="true"
      :show-validation-summary="true"
      :validation-group="taskValidatorName"
    >
      <DxGroupItem>
        <DxSimpleItem
          :editor-options="subjectOptions"
          data-field="subject"
          editor-type="dxTextArea"
        >
          <DxLabel location="left" :text="$t('task.fields.subjectTask')" />
          <DxRequiredRule :message="$t('task.validation.subjectRequired')" />
        </DxSimpleItem>

        <DxGroupItem :col-count="2">
          <DxSimpleItem data-field="addressee" template="addressee">
            <DxRequiredRule
              :message="$t('task.validation.addresseeRequired')"
            />
            <DxLabel location="left" :text="$t('task.fields.addressee')" />
          </DxSimpleItem>
          <DxSimpleItem
            data-field="deadline"
            :editor-options="deadlineOptions"
            editor-type="dxDateBox"
          >
            <DxLabel location="left" :text="$t('task.fields.deadLine')" />
          </DxSimpleItem>
        </DxGroupItem>
        <DxSimpleItem
          template="resolutionObservers"
          data-field="resolutionObservers"
        >
          <DxLabel location="left" :text="$t('task.fields.observers')" />
        </DxSimpleItem>

        <DxSimpleItem
          v-if="isDraft"
          data-field="body"
          editor-type="dxTextArea"
          template="autoText"
        >
          <DxLabel location="left" :text="$t('task.fields.comment')" />
        </DxSimpleItem>
      </DxGroupItem>
      <template #autoText>
        <auto-text
          :value="task.body"
          :options="autoComleteOptions"
          @valueChanged="setBody"
        />
      </template>
      <template #addressee>
        <employee-select-box
          :read-only="readOnly"
          :messageRequired="$t('task.validation.addresseeRequired')"
          :validator-group="taskValidatorName"
          :value="addressee"
          @valueChanged="setAddressee"
        />
      </template>
      <template #resolutionObservers>
        <recipient-tag-box
          :read-only="readOnly"
          :recipients="resolutionObservers"
          @setRecipients="setResolutionObservers"
        />
      </template>
    </DxForm>
  </div>
</template>
<script>
import recipientTagBox from "~/components/recipient/tag-box/index.vue";
import employeeSelectBox from "~/components/employee/custom-select-box.vue";
import employeeTagBox from "~/components/employee/custom-tag-box.vue";
import AutoText from "~/components/autocomplete-text-area/index.vue";
import "devextreme-vue/text-area";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
  DxRequiredRule,
} from "devextreme-vue/form";
import dataApi from "~/static/dataApi";
export default {
  components: {
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule,
    DxForm,
    employeeSelectBox,
    recipientTagBox,
    employeeTagBox,
    AutoText,
  },
  props: ["taskId", "canUpdate"],
  inject: ["taskValidatorName"],
  methods: {
    setResolutionObservers(value) {
      this.$store.commit(
        `tasks/${this.taskId}/SET_RESOLUTION_OBSERVERS`,
        value
      );
    },
    setAddressee(value) {
      this.$store.commit(`tasks/${this.taskId}/SET_ADDRESSEE`, value);
    },
    setBody(value) {
      this.$store.commit(`tasks/${this.taskId}/SET_BODY`, value);
    },
  },
  computed: {
    readOnly() {
      return !this.isDraft || !this.canUpdate;
    },
    task() {
      return this.$store.getters[`tasks/${this.taskId}/task`];
    },
    resolutionObservers() {
      return this.task.resolutionObservers;
    },
    addressee() {
      return this.task.addressee;
    },
    autoComleteOptions() {
      return {
        category: "Task",
        entityType: this.task.taskType,
        height: 250,
      };
    },
    isDraft() {
      return this.$store.getters[`tasks/${this.taskId}/isDraft`];
    },
    subjectOptions() {
      return {
        autoResizeEnabled: true,
        readOnly: true,
        value: this.task.subject,
        onValueChanged: (e) => {
          this.$store.commit(`tasks/${this.taskId}/SET_SUBJECT`, e.value);
        },
      };
    },
    deadlineOptions() {
      return {
        type: "datetime",
        dateSerializationFormat: "yyyy-MM-ddTHH:mm:ss",
        value: this.task.deadline,
        useMaskBehavior: true,
        openOnFieldClick: true,
        onValueChanged: (e) => {
          this.$store.commit(`tasks/${this.taskId}/SET_DEADLINE`, e.value);
        },
      };
    },
  },
};
</script>
