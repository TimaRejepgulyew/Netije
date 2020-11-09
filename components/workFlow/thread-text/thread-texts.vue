<template>
  <div>
    <div>
      <DxPopup
        :showTitle="false"
        :visible.sync="showAssignmentCard"
        :drag-enabled="false"
        :close-on-outside-click="true"
        :show-title="true"
        width="90%"
        :height="'95%'"
      >
        <div class="scrool-auto">
          <card-assignment
            @complete="togglePopup('showAssignmentCard')"
            v-if="showAssignmentCard"
            :assignmentId="currentAssignmentId"
            :isCard="true"
          />
        </div>
      </DxPopup>
      <DxPopup
        :showTitle="false"
        :visible.sync="showTaskCard"
        :drag-enabled="false"
        :close-on-outside-click="true"
        :show-title="true"
        width="90%"
        :height="'95%'"
      >
        <div class="scrool-auto">
          <card-task
            v-if="showTaskCard"
            :taskId="currentTaskCardId"
            @onClose="closeTask"
            :isCard="true"
          />
        </div>
      </DxPopup>
      <DxPopup
        :showTitle="false"
        :visible.sync="showAuthorCard"
        :drag-enabled="false"
        :close-on-outside-click="true"
        :show-title="true"
        width="90%"
       :height="'95%'"
      >
        <div class="scrool-auto">
          <employee-card
            v-if="showAuthorCard"
            :data="currentEmployee"
            :isCard="true"
          />
        </div>
      </DxPopup>
      <div class="toolbar--position-top">
        <DxToolbar>
          <DxItem
            :options="refreshOptions"
            location="after"
            widget="dxButton"
          />
        </DxToolbar>
      </div>
      <div class="tread-text__list">
        <DxList
          :hover-state-enabled="false"
          :activeStateEnabled="false"
          :focusStateEnabled="false"
          :data-source="comments"
          :search-enabled="false"
        >
          <template #item="item">
            <div class="list-container">
              <tread-text-mediator
                @toDetailAuthor="toDetailAuthor"
                @toDetailTask="toDetailTask"
                @toDetailAssignment="toDetailAssignment"
                :comment="item.data"
              />
            </div>
          </template>
        </DxList>
      </div>
    </div>
  </div>
</template>
<script>
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import { load as assignmentLoad } from "~/infrastructure/services/assignmentService.js";
import { load as taskLoad } from "~/infrastructure/services/taskService.js";
import cardAssignment from "~/components/assignment/index.vue";
import cardTask from "~/components/task/index.vue";
import { DxPopup } from "devextreme-vue/popup";
import employeeCard from "~/components/employee/employee-card.vue";
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
import DxList from "devextreme-vue/list";
import moment from "moment";
export default {
  components: {
    DxToolbar,
    DxItem,
    cardAssignment,
    cardTask,
    employeeCard,
    DxPopup,
    DxList,
    treadTextMediator: async () =>
      await import("~/components/workFlow/thread-text/text-mediator.vue")
  },
  name: "thread-texts",
  props: ["id", "entityType", "isRefreshing"],
  watch: {
    isRefreshing: function(value) {
      if (value) {
        this.$data.comments.reload();
        this.$emit("refreshed");
      }
    }
  },
  data() {
    const url =
      this.entityType === "task"
        ? dataApi.task.TextsByTask
        : dataApi.assignment.TextsByAssignment;
    return {
      comments: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: url + this.id
        }),
        paginate: true,
        pageSize: 10
      }),
      showTaskCard: false,
      currentTaskCardId: null,
      showAuthorCard: false,
      currentEmployee: null,
      showAssignmentCard: false,
      currentAssignmentId: null
    };
  },
  computed: {
    refreshOptions() {
      return {
        icon: "refresh",
        onClick: () => {
          this.comments.reload();
        }
      };
    }
  },
  methods: {
    closeTask() {
      this.togglePopup("showTaskCard");
    },
    togglePopup(popupName) {
      this[popupName] = !this[popupName];
    },
    async toDetailAuthor(id) {
      console.log(id);
      const { data } = await this.$axios.get(
        `${dataApi.company.Employee}/${id}`
      );
      this.currentEmployee = data;
      this.togglePopup("showAuthorCard");
    },
    toDetailAssignment({ id, assignmentType }) {
      this.currentAssignmentId = id;
      this.$awn.asyncBlock(
        assignmentLoad(this, this.currentAssignmentId),
        () => {
          this.togglePopup("showAssignmentCard");
        },
        () => {}
      );
    },
    async toDetailTask({ id, taskType }) {
      this.currentTaskCardId = id;
      this.$awn.asyncBlock(
        taskLoad(this, { taskType, taskId: id }),
        () => {
          this.togglePopup("showTaskCard");
        },
        () => {}
      );
    }
  }
};
</script>
<style scoped>
.list-container {
  box-sizing: border-box;
  width: 100%;
}

.dx-list-item-content {
  padding: 0px;
}
.toolbar--position-top {
  z-index: 5;
  position: sticky;
  top: 0;
  overflow: hidden;
}
/* .tread-text__list{
  padding: 50px 0;
} */
</style>
