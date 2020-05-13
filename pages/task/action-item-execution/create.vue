<template>
  <div id="form-demo">
    <div class="widget-container">
      <Header :headerTitle="$t('translations.fields.createActionTask')"></Header>
      <toolbar @importantChanged="importantChanged" />
      <div class="item f-grow-3">
        <DxForm
          ref="form"
          :col-count="1"
          :form-data.sync="store"
          :read-only="false"
          :show-colon-after-label="true"
          :show-validation-summary="false"
          validation-group="simpleTaskValidationgroup"
        >
          <DxGroupItem :col-count="3">
            <DxGroupItem :caption="$t('translations.fields.main')" :col-span="2">
              <DxSimpleItem data-field="subject">
                <DxLabel location="top" :text="$t('translations.fields.subjectTask')" />
                <DxRequiredRule :message="$t('translations.fields.subjectRequired')" />
              </DxSimpleItem>
              <DxGroupItem :col-count="2">
                <DxSimpleItem
                  data-field="maxDeadline"
                  :editor-options="dateTimeOptions"
                  editor-type="dxDateBox"
                >
                  <DxLabel location="top" :text="$t('translations.fields.maxDeadline')" />
                  <DxRangeRule :min="minDate" :message="$t('translations.fields.deadLineRule')" />
                </DxSimpleItem>
                <DxSimpleItem
                  :editor-options="employeeOptions"
                  editor-type="dxSelectBox"
                  data-field="supervisorId"
                >
                  <DxLabel location="top" :text="$t('translations.fields.supervisorId')" />
                </DxSimpleItem>
                <DxSimpleItem
                  data-field="accessRights"
                  editor-type="dxSelectBox"
                  :editor-options="accessRightsOptions"
                >
                  <DxLabel location="top" :text="$t('translations.fields.accessRights')" />
                </DxSimpleItem>

                <DxSimpleItem
                  :editor-options="employeeOptions"
                  editor-type="dxSelectBox"
                  data-field="performerId"
                >
                  <DxRequiredRule :message="$t('translations.fields.assigneeIdRequired')" />
                  <DxLabel location="top" :text="$t('translations.fields.assigneeId')" />
                </DxSimpleItem>
                <DxSimpleItem
                  :editor-options="employeeOptions"
                  editor-type="dxSelectBox"
                  data-field="assignedById"
                >
                  <DxLabel location="top" :text="$t('translations.fields.assignedById')" />
                </DxSimpleItem>

                <DxSimpleItem
                  :col-span="2"
                  :editor-options="employeeOptions"
                  editor-type="dxTagBox"
                  data-field="actionItemObservers"
                >
                  <DxLabel location="top" :text="$t('translations.fields.observers')" />
                </DxSimpleItem>

                <DxSimpleItem
                  :col-span="2"
                  :editor-options="employeeOptions"
                  editor-type="dxTagBox"
                  data-field="coAssignees"
                >
                  <DxLabel location="top" :text="$t('translations.fields.coAssignees')" />
                </DxSimpleItem>
              </DxGroupItem>
            </DxGroupItem>
            <DxGroupItem>
              <DxSimpleItem :col-span="2" data-field="attachments" template="attachments">
                <DxLabel
                  :visible="false"
                  location="top"
                  :text="$t('translations.headers.attachment')"
                />
              </DxSimpleItem>
            </DxGroupItem>
          </DxGroupItem>
          <DxSimpleItem
            :col-span="3"
            data-field="actionItem"
            :editor-options="{height:300}"
            editor-type="dxTextArea"
          >
            <DxLabel location="top" :text="$t('translations.fields.actionItem')" />
            <DxRequiredRule :message="$t('translations.fields.actionItemRequired')" />
          </DxSimpleItem>
          <DxGroupItem :col-count="20" :col-span="1">
            <DxButtonItem
              :col-span="1"
              :button-options="sendButtonOptions"
              horizontal-alignment="right"
            />
            <DxButtonItem
              :col-span="1"
              :button-options="cancelButtonOptions"
              horizontal-alignment="right"
            />
          </DxGroupItem>
          <template #attachments="attachments">
            <attachments
              :attachments="attachments.data.editorOptions.value"
              @updateAttachments="updateAttachments"
            ></attachments>
          </template>
        </DxForm>
      </div>
    </div>
  </div>
</template>
<script>
import toolbar from "~/components/task/toolbar.vue";
import Important from "~/infrastructure/constants/assignmentImportance.js";
import importanceChanger from "~/components/task/importance-changer";
import "devextreme-vue/text-area";
import Header from "~/components/page/page__header";
import DataSource from "devextreme/data/data_source";
import attachments from "~/components/task/attachment-details";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxButtonItem,
  DxLabel,
  DxRequiredRule,
  DxCompareRule,
  DxRangeRule,
  DxPatternRule,
  DxAsyncRule
} from "devextreme-vue/form";
import dataApi from "~/static/dataApi";
import DxButton from "devextreme-vue/button";
export default {
  components: {
    toolbar,
    DxRangeRule,
    attachments,
    importanceChanger,
    DxButton,
    Header,
    DxGroupItem,
    DxSimpleItem,
    DxButtonItem,
    DxLabel,
    DxRequiredRule,
    DxForm
  },
  data() {
    return {
      store: {
        subject: null,
        importance: Important.Normal,
        supervisorId: null,
        maxDeadline: new Date(),
        actionItemObservers: [],
        performerId: null,
        accessRights: 60,
        attachments: [],
        actionItem: null,
        assignedById: null
      },
      dateTimeOptions: {
        type: "datetime"
      },
      minDate: new Date(),
      routeTypeOptions: {
        dataSource: [
          { id: 0, name: this.$t("translations.fields.gradually") },
          { id: 1, name: this.$t("translations.fields.parallel") }
        ],
        value: 0,
        showClearButton: true,
        valueExpr: "id",
        displayExpr: "name"
      },
      accessRightsOptions: {
        dataSource: [
          { value: 60, name: this.$t("translations.fields.reading") },
          {
            value: 80,
            name: this.$t("translations.fields.edit")
          }
        ],
        showClearButton: true,
        valueExpr: "value",
        displayExpr: "name"
      },

      addNewMember: args => {
        const newValue = args.text;
        args.customItem = newValue;
      }
    };
  },
  methods: {
    updateAttachments(attachments) {
      this.store.attachments = attachments;
    },
    importantChanged(value) {
      this.store.importance = value;
    },
    backTo() {
      this.$router.go(-1);
    },
    formatDate(date) {
      return moment(date).format("MM.DD.YYYY HH:mm");
    },
    formatAttachments(attachments) {
      return attachments.attachments.map(el => {
        return el.document.id;
      });
    },
    handleSubmit() {
      const payload = { ...this.store };
      payload.attachments = this.formatAttachments(payload.attachments);
      payload.deadline = this.formatDate(payload.deadline);
      this.$awn.asyncBlock(
        this.$axios.post(dataApi.task.CreateActionItemTask, payload),
        e => {
          this.backTo();
          this.$awn.success();
        },
        e => this.$awn.alert()
      );
    }
  },
  computed: {
    formValidate() {
      var res = this.$refs["form"].instance.validate();
      return !res.isValid;
    },
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
    },
    sendButtonOptions() {
      return this.$store.getters["globalProperties/btnSend"](this);
    },
    cancelButtonOptions() {
      return this.$store.getters["globalProperties/btnCancel"](
        this,
        this.backTo
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.mr-top-auto {
  margin-top: 40%;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
.message--error {
  display: inline;
  color: #d9534f;
  border-bottom: 1px dashed #d9534f;
  i {
    font-size: 25px;
  }
}
</style>

