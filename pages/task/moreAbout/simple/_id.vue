<template>
  <div id="form-demo">
    <div class="widget-container">
      <Header :headerTitle="headerTitle"></Header>
      <div class="d-flex message" v-if="isImportance">
        <i class="dx-icon dx-icon-info"></i>
        <span>{{$t('translations.fields.importanceMessage')}}</span>
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
            <DxGroupItem :caption="$t('translations.fields.main')">
              <DxGroupItem :col-count="5">
                <DxSimpleItem :col-span="4" data-field="subject">
                  <DxLabel location="top" :text="$t('translations.fields.subjectTask')" />
                </DxSimpleItem>
                <DxSimpleItem data-field="needsReview" editor-type="dxCheckBox">
                  <DxLabel location="top" :text="$t('translations.fields.needsReview')" />
                </DxSimpleItem>
              </DxGroupItem>
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
            </DxGroupItem>
            <DxGroupItem>
              <DxSimpleItem data-field="texts" template="comments">
                <DxLabel location="top" :text="$t('translations.fields.comments')" />
              </DxSimpleItem>
            </DxGroupItem>
            <DxGroupItem :col-count="20" :col-span="1">
              <DxButtonItem
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
            <template #comments="comments">
              <Assignment-comments @addComment="addComment($event)" :comments="comments"></Assignment-comments>
            </template>
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
import DxList from "devextreme-vue/list";
import navBar from "~/components/task/nav-bar";
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
import NavBarPerformers from "~/components/task/nav-bar/simple-assignment-perf";
import NavBarObservers from "~/components/task/nav-bar/simple-assignment-obser";
import AssignmentComments from "~/components/task/assignment-comments";
export default {
  components: {
    NavBarObservers,
    NavBarPerformers,
    DxList,
    AssignmentComments,
    attachmentDetails,
    navBar,
    DxButton,
    Header,
    DxGroupItem,
    DxSimpleItem,
    DxButtonItem,
    DxLabel,
    DxForm
  },
  async asyncData({ app, params }) {
    let store = await app.$axios.get(dataApi.task.AssignmentId + params.id);
    return {
      store: store.data
    };
  },
  created() {
    if (!this.store.isRead) {
      this.markingRead();
    }
  },
  data() {
    return {
      headerTitle: this.$t("translations.headers.moreAbout"),
      store: [],
      dateTimeOptions: {
        type: "datetime"
      }
    };
  },
  methods: {
    addComment(comment) {
      this.store.comment = comment;
    },
    handleSubmit() {
      console.log('complete');
      const store = {};
      store.assignmentId = +this.$route.params.id;
      store.attachmentDetails = this.store.attachmentDetails;
      store.comment = this.store.comment;
      this.$axios.post(dataApi.task.CompleteAssignment, store)
        .then(() => (this.store.status = 2))
        .catch(e => {
          console.log(e);
        });
    },
    async markingRead() {
      let isread = await this.$axios.post(dataApi.task.MarkAsRead, {
        assignmentId: parseInt(this.$route.params.id)
      });

      this.store.isRead = true;
    },
    addAttachment(documents) {
      if (this.store.attachmentDetails) {
        this.store.attachmentDetails = this.store.attachmentDetails.concat(
          documents
        );
      } else {
        this.store.attachmentDetails = documents;
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
    }
  },
  computed: {
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
    },
    isObserver() {
      return (
        this.store.authorId ==
        parseInt(this.$store.getters["permissons/employeeId"])
      );
    },
    isPerformer() {
      return (
        this.store.performerId ==
        parseInt(this.$store.getters["permissons/employeeId"])
      );
    },
    isImportance() {
      return this.store.importance == 0;
    },
    iscompleteAssignment() {
      return this.store.status == 2;
    }
  }
};
</script>
<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/themes/generated/variables.base.scss";

form {
  margin: 10px;
}
.navBar {
  display: flex;
  justify-content: flex-start;
}
.list-container {
  border: 0.1px solid darken($base-bg, 15);
  padding: 35px 0;
  height: 50vh;
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
.dx-icon-info {
  padding-right: 10px;
  font-size: 25px;
}
</style>

