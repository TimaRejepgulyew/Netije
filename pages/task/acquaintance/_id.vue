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
          <DxSimpleItem template="employee" data-field="observers">
            <DxLabel location="top" :text="$t('translations.fields.observers')" />
          </DxSimpleItem>

          <DxSimpleItem template="employee" data-field="performers">
            <DxLabel location="top" :text="$t('translations.fields.acquaintMembers')" />
          </DxSimpleItem>
        </DxGroupItem>
        <template #employee="employee">
          <employeeList :employee="employee.data.editorOptions.value"></employeeList>
        </template>
      </DxForm>
    </main-form>
  </div>
</template>

<script>
import employeeList from "~/components/task/employeeList";
import mainForm from "~/components/task/main-task-detail";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel
} from "devextreme-vue/form";
export default {
  components: {
    employeeList,
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