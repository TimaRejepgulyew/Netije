<template>
  <div class="d-flex align-stretch align-items-center">
    <div
      class="link d-flex f-grow-1"
      @dblclick="
        () =>
          showCard({ taskId: task.entity.id, taskType: task.entity.taskType })
      "
    >
      <div class="icon">
        <img :src="actionItemExecutionIcon" />
      </div>
      <div>
        <div class="max-width-5vw">{{ task.entity.subject }}</div>

        <div>
          <div class="d-flex">
            <div v-if="task.entity.assignee">
              {{ $t("shared.whom") }}: {{ task.entity.assignee.name }},
              <span v-if="task.entity.maxDeadline">
                {{ $t("shared.deadLine") }}
                {{ task.entity.maxDeadline | formatDate }}
              </span>
            </div>
          </div>
          <div class="d-flex">
            <div v-if="task.entity.isUnderControl">
              {{ $t("workFlow.fields.supervisor") }}:
              {{ task.entity.supervisor.name }}
            </div>
          </div>
          <!-- <div class="d-flex">
            <div
              v-if="task.entity.coAssignees.length >0"
            >{{$t("workFlow.fields.coAssignees")}}: {{task.entity.coAssignees.map(employee=>employee.name).join(", ")}}</div>
          </div>
          <div class="d-flex">
            <div
              v-if="task.entity.actionItemObservers.length >0"
            >{{$t("workFlow.fields.observers")}}: {{task.entity.actionItemObservers.map(recipient=>recipient.name).join(", ")}}</div>
          </div> -->

          <div class="d-flex ">
            <i>{{ task.entity.body }}</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import DocumentService from "~/infrastructure/services/documentVersionService";
import actionBtn from "~/components/workFlow/attachment/attachment-task-action-btn.vue";
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

  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 3px;
  text-decoration: none;
  &:hover {
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
