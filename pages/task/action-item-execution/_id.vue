<template>
  <div>
    <main-form :task="task">
      <DxForm
        slot="information"
        :col-count="1"
        :form-data.sync="task"
        :read-only="true"
        :show-colon-after-label="true"
        :show-validation-summary="true"
        validation-group="task"
      >
        <DxGroupItem :col-span="2" :caption="$t('translations.fields.main')">
          <DxSimpleItem :col-span="4" data-field="subject">
            <DxLabel location="top" :text="$t('translations.fields.subjectTask')" />
          </DxSimpleItem>

          <DxGroupItem :col-count="3">
            <DxSimpleItem
              data-field="deadline"
              :editor-options="dateTimeOptions"
              editor-type="dxDateBox"
            >
              <DxLabel location="top" :text="$t('translations.fields.deadLine')" />
            </DxSimpleItem>
            <DxSimpleItem
              :editor-options="employeeOptions"
              editor-type="dxSelectBox"
              data-field="assigneeId"
            >
              <DxLabel location="top" :text="$t('translations.fields.assigneeId')" />
            </DxSimpleItem>
            <DxSimpleItem
              :editor-options="employeeOptions"
              editor-type="dxSelectBox"
              data-field="authorId"
            >
              <DxLabel location="top" :text="$t('translations.fields.authorId')" />
            </DxSimpleItem>
            <DxSimpleItem
              :editor-options="employeeOptions"
              editor-type="dxSelectBox"
              data-field="assignedById"
            >
              <DxLabel location="top" :text="$t('translations.fields.assignedById')" />
            </DxSimpleItem>
            <DxSimpleItem template="employee" data-field="actionItemObservers">
              <DxLabel location="top" :text="$t('translations.fields.observers')" />
            </DxSimpleItem>

            <DxSimpleItem template="employee" data-field="coAssignees">
              <DxLabel location="top" :text="$t('translations.fields.coAssignees')" />
            </DxSimpleItem>
          </DxGroupItem>
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
import dataApi from "~/static/dataApi";
import DataSource from "devextreme/data/data_source";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxButtonItem,
  DxLabel
} from "devextreme-vue/form";
export default {
  components: {
    employeeList,
    mainForm,
    DxForm,
    DxGroupItem,
    DxSimpleItem,
    DxButtonItem,
    DxLabel
  },
  async asyncData({ app, params }) {
    let task = await app.$axios.get(dataApi.task.GetTaskById + params.id);
    return {
      task: task.data
    };
  },
  data() {
    return {
      task: [],
      dateTimeOptions: {
        type: "datetime"
      }
    };
  },
  computed: {
    employeeOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Employee
        }),
        showSelectionControls: true,
        maxDisplayedTags: 3,
        acceptCustomValue: true,
        onCustomItemCreating: this.addNewMember
      };
    }
  }
};
</script>