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
      <DxGroupItem :readOnly="readOnly" template="actionItemParts">
      </DxGroupItem>
      
      <DxSimpleItem
        data-field="finalDeadline"
        :editor-options="finalDeadlineOptions"
        editor-type="dxDateBox"
      >
        <DxLabel location="left" :text="$t('task.fields.finalDeadline')" />
      </DxSimpleItem>
      <template #actionItemParts> </template>
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

export default {
  components: {
    DxSimpleItem,
    DxGroupItem,
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

  computed: {
    readOnly() {
      return !this.isDraft || !this.canUpdate;
    },
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

    finalDeadlineOptions() {
      return {
        type: "datetime",
        dateSerializationFormat: "yyyy-MM-ddTHH:mm:ss",
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
