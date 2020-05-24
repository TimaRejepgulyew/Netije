<template>
  <div id="form-demo">
    <Header :headerTitle="$t('translations.fields.createActionTask')"></Header>
    <toolbar @submit="handleSubmit" @importantChanged="importantChanged" />
    <DxForm
      ref="form"
      :col-count="1"
      :form-data.sync="store"
      :read-only="false"
      :show-colon-after-label="true"
      :show-validation-summary="false"
      validation-group="actionTaskValidationgroup"
    >
      <DxGroupItem :col-count="3">
        <DxGroupItem :caption="$t('translations.fields.main')" :col-span="2">
          <DxGroupItem :col-count="2">
            <DxSimpleItem
              :editor-options="employeeOptions"
              editor-type="dxSelectBox"
              data-field="assigneeId"
            >
              <DxRequiredRule :message="$t('translations.fields.assigneeIdRequired')" />
              <DxLabel location="top" :text="$t('translations.fields.assigneeId')" />
            </DxSimpleItem>
            <DxSimpleItem
              data-field="deadline"
              :editor-options="dateTimeOptions"
              editor-type="dxDateBox"
            >
            <DxRequiredRule :message="$t('translations.fields.deadLineRequired')" />
              <DxLabel location="top" :text="$t('translations.fields.deadLine')" />
            </DxSimpleItem>
            <DxSimpleItem
              :col-span="2"
              :editor-options="employeeOptions"
              editor-type="dxSelectBox"
              data-field="supervisorId"
            >
              <DxLabel location="top" :text="$t('translations.fields.supervisorId')" />
            </DxSimpleItem>

            <DxSimpleItem
              :col-span="2"
              :editor-options="employeeOptions"
              editor-type="dxTagBox"
              data-field="coAssignees"
            >
              <DxLabel location="top" :text="$t('translations.fields.coAssignees')" />
            </DxSimpleItem>

            <DxSimpleItem
              :col-span="2"
              :editor-options="employeeOptions"
              editor-type="dxTagBox"
              data-field="actionItemObservers"
            >
              <DxLabel location="top" :text="$t('translations.fields.observers')" />
            </DxSimpleItem>
          </DxGroupItem>
        </DxGroupItem>
        <DxGroupItem>
          <DxSimpleItem :col-span="2" data-field="attachments" template="attachments">
            <DxLabel :visible="false" location="top" :text="$t('translations.headers.attachment')" />
          </DxSimpleItem>
        </DxGroupItem>
      </DxGroupItem>
      <DxSimpleItem
        :col-span="3"
        data-field="actionItem"
        :editor-options="{height:250,placeholder:$t('translations.fields.actionItemRequired')}"
        editor-type="dxTextArea"
      >
        <DxLabel location="top" :text="$t('translations.fields.actionItem')" />
        <DxRequiredRule :message="$t('translations.fields.actionItemRequired')" />
      </DxSimpleItem>
      <template #attachments="attachments">
        <attachments
          :attachments="attachments.data.editorOptions.value"
          @updateAttachments="updateAttachments"
        ></attachments>
      </template>
    </DxForm>
  </div>
</template>
<script>
import toolbar from "~/components/task/toolbar.vue";
import Important from "~/infrastructure/constants/assignmentImportance.js";
import "devextreme-vue/text-area";
import Header from "~/components/page/page__header";
import attachments from "~/components/task/attachment-details";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
  DxRequiredRule
} from "devextreme-vue/form";
import dataApi from "~/static/dataApi";

export default {
  components: {
    toolbar,
    attachments,
    Header,
    DxGroupItem,
    DxSimpleItem,
    DxRequiredRule,
    DxLabel,
    DxForm
  },
  data() {
    return {
      store: {
        importance: Important.Normal,
        supervisorId: null,
        deadline: null,
        actionItemObservers: [],
        attachments: [],
        actionItem: null,
        assigneeId: null
      },
      dateTimeOptions: {
        type: "datetime",
        dateSerializationFormat: "yyyy-MM-ddTHH:mm:ss"
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

    handleSubmit() {
      var res = this.$refs["form"].instance.validate();
      if (!res.isValid) return;
      const payload = { ...this.store };
      payload.attachments = payload.attachments.map(el => {
        return el.document.id;
      });
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
<style lang="scss" scoped>
.message--error {
  display: inline;
  color: #d9534f;
  border-bottom: 1px dashed #d9534f;
  i {
    font-size: 25px;
  }
}
</style>

