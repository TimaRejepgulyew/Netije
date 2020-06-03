<template>
  <div id="form-demo">
    <Header :headerTitle="$t('translations.fields.createSimpleTask')"></Header>
    <toolbar @submit="handleSubmit" @importantChanged="importantChanged" />
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
        <DxGroupItem :col-span="2" :caption="$t('translations.fields.main')">
          <DxGroupItem :col-count="5">
            <DxSimpleItem :col-span="4" data-field="subject">
              <DxLabel location="top" :text="$t('translations.fields.subjectTask')" />
              <DxRequiredRule :message="$t('translations.fields.subjectRequired')" />
            </DxSimpleItem>
            <DxSimpleItem data-field="needsReview" editor-type="dxCheckBox">
              <DxLabel location="top" :text="$t('translations.fields.needsReview')" />
            </DxSimpleItem>
          </DxGroupItem>
          <DxGroupItem :col-count="2">
            <DxSimpleItem
              data-field="deadline"
              :editor-options="dateTimeOptions"
              editor-type="dxDateBox"
            >
              <DxLabel location="top" :text="$t('translations.fields.deadLine')" />
            </DxSimpleItem>

            <DxSimpleItem
              data-field="routeType"
              editor-type="dxSelectBox"
              :editor-options="routeTypeOptions"
            >
              <DxLabel location="top" :text="$t('translations.fields.start')" />
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
            <DxRequiredRule :message="$t('translations.fields.performersRequired')" />
            <DxLabel location="top" :text="$t('translations.fields.performers')" />
          </DxSimpleItem>
        </DxGroupItem>
        <DxGroupItem>
          <DxSimpleItem :col-span="2" data-field="attachments" template="attachments">
            <DxLabel :visible="false" location="top" :text="$t('translations.headers.attachment')" />
          </DxSimpleItem>
        </DxGroupItem>
        <DxSimpleItem
          :col-span="3"
          data-field="comment"
          :editor-options="{height:250}"
          editor-type="dxTextArea"
        >
          <DxLabel location="top" :text="$t('translations.fields.comment')" />
        </DxSimpleItem>
      </DxGroupItem>
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
      dateTimeOptions: {
        type: "datetime",
        dateSerializationFormat: "yyyy-MM-ddTHH:mm:ss"
      },
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
      addNewMember: args => {
        console.log("DAWDAW", args);
        // const newValue = args.text;
        // args.customItem = newValue;
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
        this.$axios.post(dataApi.task.CreateSimpleTask, payload),
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
        onValueChanged: e => {
         
        },
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

