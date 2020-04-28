<template>
  <div id="form-demo">
    <div class="widget-container">
      <Header :headerTitle="headerTitle"></Header>
      <navBar @importanceChanged="importanceChanged"></navBar>
      <form class="d-flex" @submit.prevent="handleSubmit">
        <div class="item f-grow-3">
          <DxForm
            :col-count="1"
            :form-data.sync="store"
            :read-only="false"
            :show-colon-after-label="true"
            :show-validation-summary="true"
            validation-group="OfficialDocument"
          >
            <DxGroupItem>
              <DxGroupItem :caption="$t('translations.fields.main')">
                <DxGroupItem :col-count="5">
                  <DxSimpleItem :col-span="4" data-field="subject">
                    <DxLabel location="top" :text="$t('translations.fields.subjectTask')" />
                  </DxSimpleItem>
                  <DxSimpleItem
                    :visible="isSimpleTask"
                    data-field="needsReview"
                    editor-type="dxCheckBox"
                  >
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
                    <DxRangeRule :min="minDate" :message="$t('translations.fields.deadLineRule')" />
                  </DxSimpleItem>

                  <DxSimpleItem
                    :visible="isSimpleTask"
                    data-field="routeType"
                    editor-type="dxSelectBox"
                    :editor-options="routeTypeOptions"
                  >
                    <DxLabel location="top" :text="$t('translations.fields.start')" />
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
                  <DxLabel location="top" :text="$t('translations.fields.performers')" />
                </DxSimpleItem>
              </DxGroupItem>
              <DxSimpleItem :col-span="2" data-field="comment" editor-type="dxTextArea">
                <DxLabel location="top" :text="$t('translations.fields.comment')" />
              </DxSimpleItem>
            </DxGroupItem>
            <DxGroupItem :col-count="20" :col-span="1">
              <DxButtonItem
                :col-span="1"
                :button-options="saveButtonOptions"
                horizontal-alignment="right"
              />
              <DxButtonItem
                :col-span="1"
                :button-options="cancelButtonOptions"
                horizontal-alignment="right"
              />
            </DxGroupItem>
          </DxForm>
        </div>
        <div class="item">
          <attachmentDetails
            :attachmentDetails="store.attachmentDetails"
            @addAttachment="addAttachment"
          ></attachmentDetails>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import navBar from "~/components/task/nav-bar";
import "devextreme-vue/text-area";
import Header from "~/components/page/page__header";
import DataSource from "devextreme/data/data_source";
import attachmentDetails from "~/components/task/attachment-details";
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
import notify from "devextreme/ui/notify";
import DxButton from "devextreme-vue/button";
export default {
  components: {
    DxRangeRule,
    attachmentDetails,
    navBar,
    DxButton,
    Header,
    DxGroupItem,
    DxSimpleItem,
    DxButtonItem,
    DxLabel,
    DxRequiredRule,
    DxCompareRule,
    DxPatternRule,
    DxForm,
    DxAsyncRule
  },
  data() {
    return {
      addressPost: [, , dataApi.task.SimpleTask, dataApi.task.Acquaintance],
      headerTitle: this.$t("translations.headers.createSimpleTask"),

      store: {
        subject: "",
        importance: 1,
        deadline: new Date(),
        observers: [],
        performers: [],
        accessRights: 60,
        attachmentDetails: [],
        comment: ""
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
            value: 70,
            name: this.$t("translations.fields.create")
          },
          {
            value: 80,
            name: this.$t("translations.fields.edit")
          },
          {
            value: 90,
            name: this.$t("translations.fields.fullAccess")
          },
          {
            value: 100,
            name: this.$t("translations.fields.accessDenied")
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
        valueExpr: "id",
        displayExpr: "name",
        acceptCustomValue: true,
        onCustomItemCreating: this.addNewRole
      },
      addNewRole: args => {
        const newValue = args.text;
        args.customItem = newValue;
        this.roles.unshift(newValue);
      }
    };
  },
  methods: {
    addAttachment(documents) {
      if (this.store.attachmentDetails) {
        this.store.attachmentDetails = new Set(this.store.attachmentDetails);
        for (let document of documents) {
          this.store.attachmentDetails.add(document);
        }
      } else {
        this.store.attachmentDetails = new Set(documents);
      }
      this.store.attachmentDetails = [...this.store.attachmentDetails];
    },
    importanceChanged(importanceType) {
      this.store.importance = importanceType;
    },
    backTo() {
      this.$router.go(-1);
    },
    notify(msgTxt, msgType) {
      notify(
        {
          message: msgTxt,
          position: {
            my: "center top",
            at: "center top"
          }
        },
        msgType,
        3000
      );
    },
    handleSubmit() {
      this.store.attachmentDetails = this.store.attachmentDetails.map(
        ({ id }) => {
          return id;
        }
      );
      this.$axios
        .post(this.addressPost[this.$route.params.type], this.store)
        .then(res => {
          this.$router.push("/task/assignments");
          this.notify(
            this.$t("translations.headers.addDoctKindSucces"),
            "success"
          );
        })
        .catch(e => {
          this.notify(
            this.$t("translations.headers.addDoctKindError"),
            "error"
          );
        });
    }
  },
  computed: {
    isSimpleTask() {
      return +this.$route.params.type === 2;
    },
    saveButtonOptions() {
      return this.$store.getters["globalProperties/btnSave"](this);
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
<style>
form {
  margin: 10px;
}
.navBar {
  display: flex;
  justify-content: flex-start;
}
.mr-top-auto {
  margin-top: 40%;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
</style>

