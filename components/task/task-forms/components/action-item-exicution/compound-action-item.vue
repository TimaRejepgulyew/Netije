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
      <DxGroupItem template="actionItemParts"> </DxGroupItem>

      <DxSimpleItem
        data-field="finalDeadline"
        :editor-options="finalDeadlineOptions"
        editor-type="dxDateBox"
      >
        <DxLabel location="left" :text="$t('task.fields.finalDeadline')" />
      </DxSimpleItem>
      <template #actionItemParts>
        <actionItemParts :taskId="taskId" />
      </template>
    </DxForm>
  </div>
</template>
<script>
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel
} from "devextreme-vue/form";
import dataApi from "~/static/dataApi";
import actionItemParts from "~/components/task/task-forms/components/action-item-part-list.vue";
export default {
  components: {
    DxSimpleItem,
    DxGroupItem,
    DxLabel,
    DxForm,
    actionItemParts
  },
  props: ["taskId", "canUpdate"],
  inject: ["taskValidatorName"],
  data() {
    return {
      assignedByStore: `${dataApi.task.actionItemExecution.GetAvailableProducers}${this.taskId}`
    };
  },

  computed: {
    task() {
      return this.$store.getters[`tasks/${this.taskId}/task`];
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
    readOnly() {
      return !this.isDraft || !this.canUpdate;
    },

    finalDeadlineOptions() {
      return {
        type: "datetime",
        dateSerializationFormat: "yyyy-MM-ddTHH:mm:ss",
        useMaskBehavior: true,
        openOnFieldClick: true,
        value: this.task.finalDeadline,
        onValueChanged: e => {
          this.$store.commit(
            `tasks/${this.taskId}/SET_FINAL_DEADLINE`,
            e.value
          );
        }
      };
    }
  }
};
</script>
