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
            <DxSimpleItem data-field="observers">
              <DxLabel location="top" :text="$t('translations.fields.observers')" />
            </DxSimpleItem>

            <DxSimpleItem data-field="performers">
              <DxLabel location="top" :text="$t('translations.fields.performers')" />
            </DxSimpleItem>
          </DxGroupItem>
        </DxGroupItem>
        <template #employee="employee">
          <employeeList :employee="employee.data.editorOptions.value"></employeeList>
        </template>
      </DxForm>

      <div slot="comment">
        <DxTextArea :on-value-changed="addComment" :height="90" :value="comment" />
      </div>
    </main-form>
  </div>
</template>

<script>
import { DxTextArea } from "devextreme-vue";
import employeeList from "~/components/task/employeeList";
import mainForm from "~/components/assignment/main-assignment-detail";
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
    DxTextArea,
    employeeList,
    mainForm,
    DxForm,
    DxGroupItem,
    DxSimpleItem,
    DxButtonItem,
    DxLabel
  },
  async asyncData({ app, params }) {
    let task = await app.$axios.get(
      dataApi.assignment.GetAssignmentById + params.id
    );
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
  }
};
</script>

<style>
</style>