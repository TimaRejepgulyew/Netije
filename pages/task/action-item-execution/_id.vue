<template>
  <div>
    <main-form>
      <DxForm
        slot="information"
        :col-count="1"
        :form-data.sync="task"
        :read-only="true"
        :show-colon-after-label="true"
        validation-group="task"
      >
        <DxGroupItem :col-span="2" :col-count="2">
          <DxSimpleItem
            data-field="assigneeId"
            :editor-options="recipientOptions"
            editor-type="dxSelectBox"
          >
            <DxLabel location="top" :text="$t('translations.fields.assigneeId')" />
          </DxSimpleItem>
          <DxSimpleItem
            data-field="supervisorId"
            :editor-options="recipientOptions"
            editor-type="dxSelectBox"
          >
            <DxLabel location="top" :text="$t('translations.fields.supervisorId')" />
          </DxSimpleItem>
          <DxSimpleItem template="recipient" data-field="actionItemObservers">
            <DxLabel location="top" :text="$t('translations.fields.observers')" />
          </DxSimpleItem>
          <DxSimpleItem template="recipient" data-field="coAssignees">
            <DxLabel location="top" :text="$t('translations.fields.coAssignees')" />
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
import dataApi from "~/static/dataApi";
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
      },
      recipientOptions: this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.company.Employee
      })
    };
  }
};
</script>