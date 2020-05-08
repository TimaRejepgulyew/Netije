<template>
  <div>
    <main-form :assignment="assignment">
      <template slot="navbarBtn">
        <DxButton
          icon="check"
          :text="$t('translations.links.complete')"
          :on-click="completeAssignment"
        />
      </template>
      <DxForm
        slot="information"
        :col-count="1"
        :form-data.sync="assignment"
        :read-only="true"
        :show-colon-after-label="true"
        :show-validation-summary="true"
        validation-group="assignment"
      >
        <DxGroupItem :col-span="2" :caption="$t('translations.fields.main')">
          <DxSimpleItem :col-span="4" data-field="subject">
            <DxLabel location="top" :text="$t('translations.fields.subjectTask')" />
          </DxSimpleItem>
          <DxGroupItem :col-count="2">
            <DxSimpleItem
              data-field="deadline"
              :editor-options="dateTimeOptions"
              editor-type="dxDateBox"
            >
              <DxLabel location="top" :text="$t('translations.fields.deadLine')" />
            </DxSimpleItem>
            <DxSimpleItem
              data-field="performerId"
              :editor-options="employeeOptions"
              editor-type="dxSelectBox"
            >
              <DxLabel location="top" :text="$t('translations.fields.acquaintMembers')" />
            </DxSimpleItem>
          </DxGroupItem>
        </DxGroupItem>
      </DxForm>

     <div slot="comment">
        <DxTextArea :height="10" :value="comment" />
      </div>
    </main-form>
  </div>
</template>

<script>
import DxButton from "devextreme-vue/button";
import { DxTextArea } from "devextreme-vue";

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
    mainForm,
    DxForm,
    DxGroupItem,
    DxSimpleItem,
    DxButtonItem,
    DxLabel,
    DxButton
  },
  async asyncData({ app, params }) {
    let assignment = await app.$axios.get(
      dataApi.assignment.GetAssignmentById + params.id
    );
    return {
      assignment: assignment.data
    };
  },
  data() {
    return {
      assignment: [],
      comment: "",
      employeeOptions: this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.company.Employee
      }),
      dateTimeOptions: {
        type: "datetime"
      }
    };
  },
  methods: {
    completeAssignment() {
      const assignment = {};
      assignment.assignmentId = +this.$route.params.id;
      assignment.comment = this.comment;
      this.$awn.asyncBlock(
        this.$axios.post(dataApi.assignment.CompleteAssignment, assignment),
        e => {
          this.assignment.status = 2;
          this.$awn.success();
        },
        e => this.$awn.alert()
      );
    }
  }
};
</script>

<style>
</style>

