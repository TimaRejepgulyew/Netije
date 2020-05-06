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
            :form-data.sync="assignment"
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
                  <DxSimpleItem
                    :editor-options="employeeOptions"
                    editor-type="dxSelectBox"
                    data-field="authorId"
                  >
                    <DxLabel location="top" :text="$t('translations.fields.authorId')" />
                  </DxSimpleItem>

                  <DxSimpleItem
                    :editor-options="employeeOptions"
                    editor-type="dxSelectBox"
                    data-field="performerId"
                  >
                    <DxLabel location="top" :text="$t('translations.fields.performerId')" />
                  </DxSimpleItem>
                </DxGroupItem>

                <DxGroupItem>
                  <DxSimpleItem data-field="taskId" template="comments">
                    <DxLabel location="top" :text="$t('translations.fields.comments')" />
                  </DxSimpleItem>
                </DxGroupItem>
                <DxGroupItem :col-count="20" :col-span="1">
                  <DxButtonItem
                    :visible="showCompletedBtn"
                    :col-span="1"
                    :button-options="completedButtonOptions"
                    horizontal-alignment="right"
                  />
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

            <template #attachments="atachments">
              <attachmentDetails
                v-if="!isReload"
                :attachmentDetails="atachments.data.editorOptions.value"
                @addAttachment="addAttachment"
              ></attachmentDetails>
            </template>
            <template #comments="taskId">
              <Assignment-comments
                v-if="!isReload"
                @addComment="addComment($event)"
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
import DxList from "devextreme-vue/list";

import Header from "~/components/page/page__header";
import DataSource from "devextreme/data/data_source";
import attachmentDetails from "~/components/task/attachment-details";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxButtonItem,
  DxLabel
} from "devextreme-vue/form";
import dataApi from "~/static/dataApi";
import notify from "devextreme/ui/notify";
import DxButton from "devextreme-vue/button";
import AssignmentComments from "~/components/workFlow/assignment-comments";
export default {
  components: {
    DxLoadPanel,
    DxList,
    AssignmentComments,
    attachmentDetails,
    DxButton,
    Header,
    DxGroupItem,
    DxSimpleItem,
    DxButtonItem,
    DxLabel,
    DxForm
  },
  async asyncData({ app, params }) {
    let assignment = await app.$axios.get(
      dataApi.assignment.AssignmentId + params.id
    );
    return {
      assignment: assignment.data
    };
  },
  created() {
    if (!this.assignment.isRead) {
      this.markingRead();
    }
  },
  data() {
    return {
      headerTitle: this.$t("translations.headers.moreAbout"),
      assignment: [],
      dateTimeOptions: {
        type: "datetime"
      },
      isReload: false,
      icon: require("~/static/icons/loading.gif")
    };
  },
  methods: {
    addComment(comment) {
      this.assignment.comment = comment;
    },
    handleSubmit() {
      const assignment = {};
      assignment.assignmentId = +this.$route.params.id;
      assignment.attachmentDetails = this.assignment.attachmentDetails.map(
        ({ id }) => {
          return id;
        }
      );
      assignment.comment = this.assignment.comment;
      this.$awn.asyncBlock(
        this.$axios.post(dataApi.Assignment.CompleteAssignment, assignment),
        e => {
          this.assignment.status = 2;
          this.$awn.success();
        },
        e => this.$awn.alert()
      );
    },
    async markingRead() {
      let isread = await this.$axios.post(dataApi.assignment.MarkAsRead, {
        assignmentId: parseInt(this.$route.params.id)
      });

      this.assignment.isRead = true;
    },
    addAttachment(document) {
      const hasDocument = this.assignment.attachmentDetails.some(el => {
        return el.id === document.id;
      });
      if (!hasDocument) {
        this.assignment.attachmentDetails.push(document);
      } else {
        this.notify(
          this.$t("translations.taskMessage.documentAlreadyHasBeen"),
          "error"
        );
      }
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
    async reload() {
      this.isReload = true;
      const { data } = await this.$axios.get(
        dataApi.task.GetTaskById + this.$route.params.id
      );
      this.assignment = await data;
      setTimeout(() => {
        this.isReload = false;
      }, 1000);
    }
  },
  computed: {
    showCompletedBtn() {
      switch (this.assignment.assignmentType) {
        case 2:
        case 3:
        case 8:
          return !this.isCompleted;
          break;
        default:
          return false;
          break;
      }
    },
    isCompleted() {
      return this.assignment.status == 2;
    },
    isImportance() {
      return this.assignment.importance == 0;
    },
    completedButtonOptions() {
      return this.$store.getters["globalProperties/btnCompleted"](this);
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
<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/themes/generated/variables.base.scss";


.navBar {
  display: flex;
  justify-content: flex-end;
}
.list-container {
  border: 0.1px solid darken($base-bg, 15);

  overflow: auto;
  width: 100%;
  i {
    display: inline;
  }
  .list__btn-group {
    margin-left: auto;
  }
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

