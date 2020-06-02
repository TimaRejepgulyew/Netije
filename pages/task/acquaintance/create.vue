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
      validation-group="taskValidationgroup"
    >
      <DxGroupItem :col-count="3">
        <DxGroupItem :caption="$t('translations.fields.main')" :col-span="2">
          <DxSimpleItem data-field="subject">
            <DxLabel location="top" :text="$t('translations.fields.subjectTask')" />
            <DxRequiredRule :message="$t('translations.fields.subjectRequired')" />
          </DxSimpleItem>

          <DxGroupItem :col-count="3">
            <DxSimpleItem
              data-field="deadline"
              :editor-options="dateTimeOptions"
              editor-type="dxDateBox"
            >
              <DxLabel location="top" :text="$t('translations.fields.deadLine')" />
              <DxRequiredRule :message="$t('translations.fields.deadLineRequired')" />
            </DxSimpleItem>
            <DxSimpleItem data-field="isElectronicAcquaintance" editor-type="dxCheckBox">
              <DxLabel location="top" :text="$t('workFlow.isElectronicAcquaintance')" />
            </DxSimpleItem>
            <DxSimpleItem data-field="needsReview" editor-type="dxCheckBox">
              <DxLabel location="top" :text="$t('workFlow.needsReview')" />
            </DxSimpleItem>
          </DxGroupItem>
          <DxSimpleItem template="recipient" data-field="observers">
            <DxLabel location="top" :text="$t('translations.fields.observers')" />
          </DxSimpleItem>
          <DxSimpleItem data-field="performers" template="recipient">
            <DxRequiredRule :message="$t('translations.fields.acquaintMembersRequired')" />
            <DxLabel location="top" :text="$t('translations.fields.acquaintMembers')" />
          </DxSimpleItem>
          <DxSimpleItem template="recipient" data-field="excludedPerformers">
            <DxLabel location="top" :text="$t('workFlow.excludedPerformers')" />
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
      <template #recipient="recipients">
        <recipient-tag-box
          :property="recipients.data.dataField"
          :recipients="recipients.data.editorOptions.value"
          @setRecipients="setRecipients"
        />
      </template>
    </DxForm>
    <span
      v-if="errorMessage"
      class="message--error"
    >{{$t('translations.taskMessage.attachmentRequired')}}</span>
  </div>
</template>
<script>
import recipientTagBox from "~/components/page/recipient-tag-box.vue";
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
    DxForm,
    recipientTagBox
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
        comment: null,
        needsReview: false,
        isElectronicAcquaintance: true,
        excludedPerformers: []
      },
      errorMessage: false,
      dateTimeOptions: {
        type: "datetime"
      }
    };
  },
  methods: {
    setRecipients([property, value]) {
      this.store[property] = value;
    },
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
          url: dataApi.recipient.list
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

