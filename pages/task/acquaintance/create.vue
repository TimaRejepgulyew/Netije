<template>
  <div id="form-demo">
    <div class="widget-container">
      <Header :headerTitle="$t('translations.fields.createAcquaintanceTask')"></Header>
      <importanceChanger @importanceChanged="importanceChanged"></importanceChanger>
      <form class="d-flex" @submit.prevent="handleSubmit">
        <div class="item f-grow-3">
          <DxForm
            :col-count="1"
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
                </DxSimpleItem>
                <DxGroupItem :col-count="2">
                  <DxSimpleItem
                    data-field="deadline"
                    :editor-options="dateTimeOptions"
                    editor-type="dxDateBox"
                  >
                    <DxLabel location="top" :text="$t('translations.fields.deadLine')" />
                    <DxRangeRule :min="minDate" :message="$t('translations.fields.deadLineRule')" />
                  </DxSimpleItem>

                  <DxSimpleItem
                    data-field="accessRights"
                    editor-type="dxSelectBox"
                    :editor-options="accessRightsOptions"
                  >
                    <DxLabel location="top" :text="$t('translations.fields.accessRights')" />
                  </DxSimpleItem>
                </DxGroupItem>
                <DxSimpleItem
                  :editor-options="tagboxOptions"
                  editor-type="dxTagBox"
                  data-field="observers"
                >
                  <DxLabel location="top" :text="$t('translations.fields.observers')" />
                </DxSimpleItem>

                <DxSimpleItem
                  :editor-options="tagboxOptions"
                  editor-type="dxTagBox"
                  data-field="performers"
                >
                  <DxRequiredRule :message="$t('translations.fields.acquaintMembersRequired')" />
                  <DxLabel location="top" :text="$t('translations.fields.acquaintMembers')" />
                </DxSimpleItem>
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
            <DxSimpleItem :col-span="3" data-field="comment" editor-type="dxTextArea">
              <DxLabel location="top" :text="$t('translations.fields.comment')" />
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
          <span v-if="isRequired" class="error">dwadawddawdawd</span>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
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
        importance: 1,
        deadline: new Date(),
        observers: [],
        performers: [],
        accessRights: 60,
        attachments: [],
        comment: null
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

      tagboxOptions: {
        dataSource: this.$dxStore({
          key: "id",
          loadUrl: dataApi.company.Employee
        }),
        showSelectionControls: true,
        maxDisplayedTags: 3,
        valueExpr: "id",
        displayExpr: "name",
        paginate: true,
        pageSize: 10,
        acceptCustomValue: true,
        onCustomItemCreating: this.addNewMember
      },
      addNewMember: args => {
        const newValue = args.text;
        args.customItem = newValue;
      },
      submit: false
    };
  },
  methods: {
    updateAttachments(attachments) {
      this.store.attachments = attachments;
    },
    importanceChanged(importanceType) {
      this.store.importance = importanceType;
    },
    backTo() {
      this.$router.go(-1);
    },
    handleSubmit() {
      this.submit = true;
      if (!this.isRequired) {
        console.log(this.isRequired);
        // const payload = { ...this.store };
        // payload.attachments = payload.attachments.map(el => {
        //   return el.id;
        // });
        // this.$awn.asyncBlock(
        //   this.$axios.post(dataApi.task.CreateAcquaintanceTask, payload),
        //   e => {
        //     this.backTo();
        //     this.$awn.success();
        //   },
        //   e => this.$awn.alert()
        // );
      }
    }
  },
  computed: {
    isRequired() {
      return !this.store.attachments && this.submit;
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

