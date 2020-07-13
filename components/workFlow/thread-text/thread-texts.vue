<template>
  <div>
    <div>
      <DxPopup
        :showTitle="false"
        :visible.sync="showTaskCard"
        :drag-enabled="false"
        :close-on-outside-click="true"
        :show-title="true"
        width="90%"
        :height="'auto'"
      >
        <div>
          <card-task
            v-if="showTaskCard"
            :taskId="currentTaskCardId"
            @closeTask="closeTask"
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
        :height="'auto'"
      >
        <div>
          <employee-card v-if="showAuthorCard" :employeeId="currentAuthorId" :isCard="true" />
        </div>
      </DxPopup>
      <DxList
        :hover-state-enabled="false"
        :activeStateEnabled="false"
        :focusStateEnabled="false"
        :data-source="comments"
        :search-enabled="false"
      >
        <template #item="item">
          <div class="list-container">
            <task-thread-text
              @toDetailAuthor="toDetailAuthor"
              @toDetailTask="toDetailTask"
              :comment="item.data"
            />
          </div>
        </template>
      </DxList>
    </div>
  </div>
</template>
<script>
import taskThreadText from "~/components/workFlow/thread-text/task-item.vue";
import cardTask from "~/components/task/index.vue";
import { DxPopup } from "devextreme-vue/popup";
import employeeCard from "~/components/employee/employee-card.vue";
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
import DxList from "devextreme-vue/list";
import moment from "moment";
export default {
  components: {
    cardTask,
    DxPopup,
    DxList,
    taskThreadText
  },
  name: "thread-texts",
  props: ["id", "entityType"],
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
        })
      }),
      showTaskCard: false,
      showAuthorCard: false,
      currentAuthorId: null,
      currentTaskCardId: null
    };
  },
  methods: {
    closeTask() {},
    tooglePopup(popupName) {
      this[popupName] = !this[popupName];
    },
    toDetailAuthor(id) {
      this.currentAuthorId = id;
      this.tooglePopup("showAuthorCard");
    },
    async toDetailTask({ id, taskType }) {
      this.currentTaskCardId = id;
      this.$awn.asyncBlock(
        this.$store.dispatch("currentTask/load", { taskType, key: id }),
        () => {
          this.tooglePopup("showTaskCard");
        },
        () => {}
      );
    }
  }
};
</script>
<style  scoped>
.list-container {
  box-sizing: border-box;
  width: 100%;
}
</style>
