<template>
  <div id="form-demo">
    <div class="widget-container">
      <DxLoadPanel :visible.sync="isReload" id="large-indicator" :indicatorSrc="icon" />
      <Header :headerTitle="$t('translations.headers.moreAbout')"></Header>
      <status-message :importance="store.importance" :completed="store.status" />
      <div class="navBar">
        <DxButton icon="refresh" :on-click="reload" />
      </div>
      <form class="d-flex" @submit.prevent="handleSubmit">
        <div class="item f-grow-3">
          <slot name="information"></slot>
          <DxForm
            :col-count="1"
            :form-data.sync="store"
            :read-only="true"
            :show-colon-after-label="true"
            :show-validation-summary="true"
            validation-group="task"
          >
            <DxGroupItem :col-span="3" :caption="$t('translations.fields.main')">
              <DxGroupItem>
                <DxSimpleItem data-field="id" template="comments">
                  <DxLabel location="top" :text="$t('translations.fields.comments')" />
                </DxSimpleItem>
              </DxGroupItem>
              <DxButtonItem :button-options="cancelButtonOptions" horizontal-alignment="left" />
            </DxGroupItem>
            <template #employee="employee">
              <employeeList :employee="employee.data.editorOptions.value"></employeeList>
            </template>
            <template #comments="taskId">
              <Assignment-comments v-if="!isReload" :taskId="taskId.data.editorOptions.value"></Assignment-comments>
            </template>
          </DxForm>
        </div>
        <div class="item">
          <attachmentDetails
            v-if="!isReload"
            :readOnly="true"
          ></attachmentDetails>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { DxLoadPanel } from "devextreme-vue/load-panel";
import Header from "~/components/page/page__header";
import attachmentDetails from "~/components/task/attachment-details";
import DxButton from "devextreme-vue/button";
import AssignmentComments from "~/components/task/assignment-comments";
import statusMessage from "~/components/task/status-message";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxButtonItem,
  DxLabel
} from "devextreme-vue/form";
export default {
  components: {
    statusMessage,
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
  props: ["store"],
  data() {
    return {
      dateTimeOptions: {
        type: "datetime"
      },
      isReload: false,
      icon: require("~/static/icons/loading.gif")
    };
  },
  methods: {
    async reload() {
      this.isReload = true;
      setTimeout(() => {
        this.isReload = false;
      }, 1000);
    },
    backTo() {
      this.$router.go(-1);
    }
  },
  computed: {
    cancelButtonOptions() {
      return this.$store.getters["globalProperties/btnCancel"](
        this,
        this.backTo
      );
    }
  }
};
</script>
<style scoped>
form {
  margin: 10px;
}
.navBar {
  display: flex;
  justify-content: flex-end;
  justify-items: flex-end;
}
</style>

