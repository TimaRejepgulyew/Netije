<template>
  <div>
    <main-form>
      <DxForm
        slot="information"
        :col-count="1"
        :form-data.sync="task"
        :read-only="true"
        :show-colon-after-label="true"
        :show-validation-summary="true"
        validation-group="task"
      >
        <DxGroupItem :col-span="2" :col-count="2">
          <DxSimpleItem editor-type="dxCheckBox" data-field="needsReview">
            <DxLabel location="top" :text="$t('workFlow.needsReview')" />
          </DxSimpleItem>
          <DxSimpleItem editor-type="dxCheckBox" data-field="isElectronicAcquaintance">
            <DxLabel location="top" :text="$t('workFlow.isElectronicAcquaintance')" />
          </DxSimpleItem>
          <DxSimpleItem template="recipient" data-field="observers">
            <DxLabel location="top" :text="$t('translations.fields.observers')" />
          </DxSimpleItem>
          <DxSimpleItem template="recipient" data-field="performers">
            <DxLabel location="top" :text="$t('translations.fields.acquaintMembers')" />
          </DxSimpleItem>
          <DxSimpleItem template="recipient" data-field="excludedPerformers">
            <DxLabel location="top" :text="$t('translations.fields.acquaintMembers')" />
          </DxSimpleItem>
        </DxGroupItem>
        <template #recipient="recipient">
          <recipientList :recipient="recipient.data.editorOptions.value"></recipientList>
        </template>
      </DxForm>
    </main-form>
  </div>
</template>

<script>
import recipientList from "~/components/task/recipientList";
import mainForm from "~/components/task/main-task-detail";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel
} from "devextreme-vue/form";
export default {
  components: {
    recipientList,
    mainForm,
    DxForm,
    DxGroupItem,
    DxSimpleItem,
    DxLabel
  },
  async asyncData({ app, params }) {
    await app.store.dispatch("currentTask/load", params.id);
  },
  data() {
    return {
      task: this.$store.getters["currentTask/task"],
      dateTimeOptions: {
        type: "datetime"
      }
    };
  }
};
</script>