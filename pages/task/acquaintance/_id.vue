<template>
  <div id="form-demo">
    <div class="widget-container">
      <DxLoadPanel :visible.sync="isReload" id="large-indicator" :indicatorSrc="icon" />
      <Header :headerTitle="headerTitle"></Header>
      <div class="d-flex message" v-if="isImportance">
        <i class="dx-icon dx-icon-info"></i>
        <span>{{$t('translations.fields.importanceMessage')}}</span>
      </div>
      <div class="d-flex isCompleted" v-if="isCompleted">
        <i class="dx-icon dx-icon-check"></i>
        <span>{{$t('translations.fields.completedMessage')}}</span>
      </div>
      <div class="navBar">
        <DxButton icon="undo" :on-click="reload" />
      </div>
      <form class="d-flex" @submit.prevent="handleSubmit">
        <div class="item f-grow-3">
          <DxForm
            :col-count="1"
            :form-data.sync="store"
            :read-only="true"
            :show-colon-after-label="true"
            :show-validation-summary="true"
            validation-group="OfficialDocument"
          >
            <DxGroupItem :col-count="3">
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
                  <DxSimpleItem template="employee" data-field="observers">
                    <DxLabel location="top" :text="$t('translations.fields.observers')" />
                  </DxSimpleItem>

                  <DxSimpleItem template="employee" data-field="performers">
                    <DxLabel location="top" :text="$t('translations.fields.performers')" />
                  </DxSimpleItem>
                </DxGroupItem>

                <DxGroupItem>
                  <DxSimpleItem data-field="id" template="comments">
                    <DxLabel location="top" :text="$t('translations.fields.comments')" />
                  </DxSimpleItem>
                </DxGroupItem>
                <DxGroupItem :col-count="20" :col-span="1">
                  <DxButtonItem
                    :col-span="1"
                    :button-options="cancelButtonOptions"
                    horizontal-alignment="right"
                  />
                </DxGroupItem>
              </DxGroupItem>

              <DxGroupItem :caption="$t('translations.headers.attachment')">
                <DxSimpleItem :col-span="2" data-field="attachmentDetails" template="attachments">
                  <DxLabel
                    :visible="false"
                    location="top"
                    :text="$t('translations.headers.attachment')"
                  />
                </DxSimpleItem>
              </DxGroupItem>
            </DxGroupItem>
            <template #employee="employee">
              <employeeList :employee="employee.data.editorOptions.value"></employeeList>
            </template>
            <template #attachments="atachments">
              <attachmentDetails
                v-if="!isReload"
                :readOnly="true"
                :attachmentDetails="atachments.data.editorOptions.value"
              ></attachmentDetails>
            </template>
            <template #comments="taskId">
              <Assignment-comments
                v-if="!isReload"
                :isCompleted="isCompleted"
                :taskId="taskId.data.editorOptions.value"
              ></Assignment-comments>
            </template>
          </DxForm>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { DxLoadPanel } from "devextreme-vue/load-panel";
import Header from "~/components/page/page__header";
import DataSource from "devextreme/data/data_source";
import attachmentDetails from "~/components/task/attachment-details";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxButtonItem,
  DxLabel
} from "devextreme-vue/form";
import employeeList from "~/components/task/employeeList";
import dataApi from "~/static/dataApi";
import notify from "devextreme/ui/notify";
import DxButton from "devextreme-vue/button";
import AssignmentComments from "~/components/task/assignment-comments";
export default {
  components: {
    employeeList,
    AssignmentComments,
    attachmentDetails,
    DxButton,
    Header,
    DxGroupItem,
    DxSimpleItem,
    DxButtonItem,
    DxLabel,
    DxForm,
    DxLoadPanel
  },
  async asyncData({ app, params }) {
    let store = await app.$axios.get(dataApi.task.GetTaskById + params.id);
    return {
      store: store.data,
      isReload: false
    };
  },
  data() {
    return {
      headerTitle: this.$t("translations.headers.moreAbout"),
      store: [],
      dateTimeOptions: {
        type: "datetime"
      },
      icon: require("~/static/icons/loading.gif")
    };
  },
  methods: {
    async reload() {
      this.isReload = true;
      const { data } = await this.$axios.get(
        dataApi.task.GetTaskById + this.$route.params.id
      );
      this.store = await data;
      setTimeout(() => {
        this.isReload = false;
      }, 1000);
     
    },
    backTo() {
      this.$router.go(-1);
    }
  },
  computed: {
    isCompleted() {
      return this.store.status == 2;
    },
    isImportance() {
      return this.store.importance == 0;
    },
    cancelButtonOptions() {
      return this.$store.getters["globalProperties/btnCancel"](
        this,
        this.backTo
      );
    },

    employeeOptions() {
      return this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.company.Employee
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/themes/generated/variables.base.scss";

form {
  margin: 10px;
}
.navBar {
  display: flex;

  justify-content: flex-end;
  justify-items: flex-end;
}

.message {
  margin: 10px 0 10px 0;
  padding: 5px 10px;
  background: coral;
  color: aliceblue;
}
.isCompleted {
  margin: 10px 0 10px 0;
  padding: 5px 10px;
  background: green;
  color: aliceblue;
  .dx-icon-check {
    margin: 0px 5px;
    border: 3px solid aliceblue;
    border-radius: 30px;
  }
}
.dx-icon-info {
  padding-right: 10px;
  font-size: 25px;
}
</style>

