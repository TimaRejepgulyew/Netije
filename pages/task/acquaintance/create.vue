<template>
  <div id="form-demo">
    <Header :headerTitle="$t('translations.fields.createAcquaintanceTask')"></Header>
    <toolbar @submit="handleSubmit" @importantChanged="importantChanged" />
    <DxForm
      ref="form"
      :form-data.sync="store"
      :read-only="false"
      :show-colon-after-label="true"
      :show-validation-summary="true"
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
              data-field="deadline"
              :editor-options="dateTimeOptions"
              editor-type="dxDateBox"
            >
              <DxLabel location="top" :text="$t('translations.fields.deadLine')" />
              <DxRequiredRule :message="$t('translations.fields.deadLineRequired')" />
            </DxSimpleItem>

            <DxSimpleItem
              data-field="accessRights"
              editor-type="dxSelectBox"
              :editor-options="accessRightsOptions"
            >
              <DxLabel location="top" :text="$t('translations.fields.permissions')" />
            </DxSimpleItem>
          </DxGroupItem>
          <DxSimpleItem
            :editor-options="employeeOptions"
            editor-type="dxTagBox"
            data-field="observers"
          >
            <DxLabel location="top" :text="$t('translations.fields.observers')" />
          </DxSimpleItem>

          <DxSimpleItem
            :editor-options="employeeOptions"
            editor-type="dxTagBox"
            data-field="performers"
          >
            <DxRequiredRule :message="$t('translations.fields.acquaintMembersRequired')" />
            <DxLabel location="top" :text="$t('translations.fields.acquaintMembers')" />
          </DxSimpleItem>
        </DxGroupItem>
        <DxGroupItem>
          <DxSimpleItem :col-span="2" data-field="attachments" template="attachments">
            <DxLabel :visible="false" location="top" :text="$t('translations.headers.attachment')" />
          </DxSimpleItem>
        </DxGroupItem>
      </DxGroupItem>
      <DxSimpleItem
        :col-span="3"
        data-field="comment"
        :editor-options="{height:250}"
        editor-type="dxTextArea"
      >
        <DxLabel location="top" :text="$t('translations.fields.comment')" />
      </DxSimpleItem>
      <template #attachments="attachments">
        <attachments
          :attachments="attachments.data.editorOptions.value"
          @updateAttachments="updateAttachments"
        ></attachments>
      </template>
    </DxForm>
    <span
      v-if="errorMessage"
      class="message--error"
    >{{$t('translations.taskMessage.attachmentRequired')}}</span>
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
    DxLabel,
    DxRequiredRule,
    DxForm
  },
  data() {
    return {
      store: {
        subject: null,
        importance: Important.Normal,
        deadline: null,
        observers: [],
        performers: [],
        accessRights: 60,
        attachments: [],
        comment: null
      },
      errorMessage: false,
      dateTimeOptions: {
        type: "datetime"
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
    importantChanged(importanceType) {
      this.store.importance = importanceType;
    },
    backTo() {
      this.$router.go(-1);
    },
    handleSubmit() {
      var res = this.$refs["form"].instance.validate();
      if (!this.requiredAttachment) {
        if (!res.isValid) return;
        const payload = { ...this.store };
        payload.attachments = payload.attachments.map(el => {
          return el.document.id;
        });
        this.$awn.asyncBlock(
          this.$axios.post(dataApi.task.CreateAcquaintanceTask, payload),
          e => {
            this.backTo();
            this.$awn.success();
          },
          e => this.$awn.alert()
        );
      }
    }
  },
  computed: {
    requiredAttachment() {
      this.errorMessage = this.store.attachments == false;
      return this.store.attachments == false;
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

