<template>
  <div id="form-demo">
    <DxForm
      ref="form"
      :read-only="!canUpdate"
      :show-colon-after-label="true"
      :show-validation-summary="true"
      :validation-group="taskValidatorName"
    >
      <DxGroupItem>
        <DxSimpleItem :editor-options="subjectOptions" data-field="subject">
          <DxLabel location="left" :text="$t('task.fields.subjectTask')" />
          <DxRequiredRule :message="$t('task.validation.subjectRequired')" />
        </DxSimpleItem>

        <DxGroupItem :col-count="2">
          <DxSimpleItem data-field="addressee" template="addressee">
            <DxRequiredRule :message="$t('task.validation.addresseeRequired')" />
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
        <DxSimpleItem template="resolutionObservers" data-field="resolutionObservers">
          <DxLabel location="left" :text="$t('task.fields.observers')" />
        </DxSimpleItem>

        <DxSimpleItem
          v-if="isDraft"
          data-field="body"
          :editor-options="bodyOptions"
          editor-type="dxTextArea"
        >
          <DxLabel location="left" :text="$t('task.fields.comment')" />
        </DxSimpleItem>
      </DxGroupItem>
      <template #addressee>
        <employee-select-box
          :read-only="!isDraft"
          :messageRequired="$t('task.validation.addresseeRequired')"
          :validator-group="taskValidatorName"
          :value="addressee"
          @valueChanged="setAddressee"
        />
      </template>
      <template #resolutionObservers>
        <recipient-tag-box
          :read-only="!isDraft"
          :recipients="resolutionObservers"
          @setRecipients="setResolutionObservers"
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
  },
  props: ["taskId"],
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
  },
  computed: {
    task() {
      return this.$store.getters[`tasks/${this.taskId}/task`];
    },
    resolutionObservers() {
      return this.task.resolutionObservers;
    },
    addressee() {
      return this.task.addressee;
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
    bodyOptions() {
      return {
        height: 250,
        value: this.task.body,
        onValueChanged: (e) => {
          this.$store.commit(`tasks/${this.taskId}/SET_BODY`, e.value);
        },
      };
    },
    deadlineOptions() {
      return {
        type: "datetime",
        dateSerializationFormat: "yyyy-MM-ddTHH:mm:ss",
        value: this.task.deadline,
        onValueChanged: (e) => {
          this.$store.commit(`tasks/${this.taskId}/SET_DEADLINE`, e.value);
        },
      };
    },
  },
};
</script>
