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
        >
          <DxLabel location="left" :text="$t('task.fields.subjectTask')" />
          <DxRequiredRule :message="$t('task.validation.subjectRequired')" />
        </DxSimpleItem>

        <DxSimpleItem data-field="approvers" template="approvers">
          <DxRequiredRule
            :message="$t('task.validation.approversRerquired ')"
          />
          <DxLabel location="left" :text="$t('task.fields.approvers')" />
        </DxSimpleItem>
        <DxGroupItem :col-count="9">
          <DxSimpleItem
            :col-span="3"
            data-field="maxDeadline"
            :editor-options="maxDeadlineOptions"
            editor-type="dxDateBox"
          >
            <DxLabel location="left" :text="$t('task.fields.deadLine')" />
          </DxSimpleItem>
          <DxSimpleItem
            :col-span="4"
            data-field="receiveOnCompletion"
            :editor-options="receiveOnCompletionOptions"
            editor-type="dxSelectBox"
          >
            <DxRequiredRule
              :message="$t('task.validation.receiveOnCompletionRequired')"
            />
            <DxLabel
              location="left"
              :text="$t('task.fields.receiveOnCompletion')"
            />
          </DxSimpleItem>
          <DxSimpleItem
            :visible="false"
            :col-span="2"
            data-field="receiveNotice"
            :editor-options="receiveNoticeOptions"
            editor-type="dxCheckBox"
          >
            <DxLabel location="left" :text="$t('task.fields.receiveNotice')" />
          </DxSimpleItem>
        </DxGroupItem>
        <DxSimpleItem template="observers" data-field="observers">
          <DxLabel location="left" :text="$t('task.fields.copies')" />
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
          :value="body"
          :options="autoComleteOptions"
          @valueChanged="setBody"
        />
      </template>
      <template #approvers>
        <recipient-tag-box
          :read-only="readOnly"
          :validatorGroup="taskValidatorName"
          :recipients="approvers"
          @setRecipients="setApprovers"
        />
      </template>
      <template #observers>
        <recipient-tag-box
          :read-only="readOnly"
          :recipients="observers"
          @setRecipients="setObservers"
        />
      </template>
    </DxForm>
  </div>
</template>
<script>
import recipientTagBox from "~/components/recipient/tag-box/index.vue";
import AutoText from "~/components/autocomplete-text/text-area/index.vue";

import "devextreme-vue/text-area";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
  DxRequiredRule,
} from "devextreme-vue/form";
import dataApi from "~/static/dataApi";
import DataSource from "devextreme/data/data_source";
export default {
  components: {
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule,
    DxForm,
    recipientTagBox,
    AutoText,
  },
  props: ["taskId", "canUpdate"],
  inject: ["taskValidatorName"],
  methods: {
    setObservers(value) {
      this.$store.commit(`tasks/${this.taskId}/SET_OBSERVERS`, value);
    },
    setApprovers(value) {
      this.$store.commit(`tasks/${this.taskId}/SET_APPROVERS`, value);
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
    observers() {
      return this.task.observers;
    },
    approvers() {
      return this.task.approvers;
    },
    body() {
      return this.task.body;
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
        onValueChanged: (e) => {
          this.$store.commit(`tasks/${this.taskId}/SET_SUBJECT`, e.value);
        },
      };
    },
    autoComleteOptions() {
      return {
        category: "Task",
        entityType: this.task.taskType,
        height: 250,
      };
    },
    maxDeadlineOptions() {
      return {
        type: "datetime",
        dateSerializationFormat: "yyyy-MM-ddTHH:mm:ss",
        value: this.task.maxDeadline,
        useMaskBehavior: true,
        openOnFieldClick: true,
        onValueChanged: (e) => {
          this.$store.commit(`tasks/${this.taskId}/SET_MAX_DEADLINE`, e.value);
        },
      };
    },
    receiveNoticeOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),

        value: this.task.receiveNotice,
        onValueChanged: (e) => {
          this.$store.commit(
            `tasks/${this.taskId}/SET_RECEIVE_NOTICE`,
            e.value
          );
        },
      };
    },
    receiveOnCompletionOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        dataSource: [
          { id: 0, name: this.$t("task.sources.assignment") },
          { id: 1, name: this.$t("task.sources.notification") },
        ],
        value: this.task.receiveOnCompletion,
        onValueChanged: (e) => {
          this.$store.commit(
            `tasks/${this.taskId}/SET_RECEIVE_ON_COMPLETION`,
            e.value
          );
        },
      };
    },
  },
};
</script>
