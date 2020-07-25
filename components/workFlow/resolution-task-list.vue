<template>
  <div class="d-flex align-stretch align-items-center">
    <div
      class="link d-flex f-grow-1"
      @dblclick="()=>showCard({taskId:task.entity.id,taskType:task.entity.taskType})"
    >
      <div class="icon">
        <img :src="actionItemExecutionIcon" />
      </div>
      <div>
        <div
          class="max-width-5vw"
        >{{$t("task.prefixes.actionItemExecutionTask")}}: {{task.entity.subject}}</div>

        <div>
          <div class="d-flex">
            <div v-if="task.entity.assignedBy
">
              {{$t("shared.from")}}:
              {{task.entity.assignedBy.name}}
            </div>
            <div v-if="task.entity.maxDeadline">
              {{$t("shared.deadLine")}}
              {{task.entity.maxDeadline|formatDate}}
            </div>
          </div>
          <div class="d-flex">
            <div
              v-if="task.entity.isUnderControl"
            >{{$t("workFlow.fields.supervisor")}}: {{task.entity.supervisor}}</div>
          </div>
          <ul v-if="task.entity.coAssigneees">
            <li
              v-for="employee in task.entity.coAssigneees"
              :key="employee.id"
            >{{$t("workFlow.fields.coAssignees")}}:{{employee.name}},</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import DocumentService from "~/infrastructure/services/documentVersionService";
import actionBtn from "~/components/workFlow/attachment-task-action-btn.vue";
import actionItemExecutionIcon from "~/static/icons/actionItemExecution.svg";
export default {
  components: {
    actionBtn
  },
  props: ["task"],
  data() {
    return {
      actionItemExecutionIcon
    };
  },
  methods: {
    showCard(task) {
      console.log("showtask resolution");
      this.$emit("showCard", task);
    }
  },
  filters: {
    formatDate(value) {
      return moment(value).format("MM.DD.YYYY HH:mm");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.align-stretch {
  align-content: stretch;
}
.max-width-5vw {
  max-width: 50vw;
  min-width: 300px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.link {
  cursor: pointer;
  color: inherit;
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 3px;
  text-decoration: none;
  &:hover {
    color: inherit;
    background: darken($base-bg, 5%);
    width: auto;
  }
}
.icon {
  width: 25px;
  margin: 0;
  margin-left: 10px;
  margin-right: 5px;
}
</style>