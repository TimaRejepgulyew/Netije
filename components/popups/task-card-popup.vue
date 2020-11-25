<template>
  <task-card
    :isCard="true"
    @onClose="close"
    @onClosed="valueChanged"
    v-if="taskId"
    :taskId="taskId"
  />
</template>

<script>
import dataApi from "~/static/dataApi";
import TaskTypeModel from "~/infrastructure/models/TaskType.js";
export default {
  components: {
    taskCard: () => import("~/components/task/index.vue")
  },
  name: "task-popup",
  props: {
    options: {
      type: Object
    }
  },
  data() {
    return {
      taskId: null
    };
  },
  async created() {
    const taskTypeModel = new TaskTypeModel(this);
    try {
      const { taskId, taskType } = await this.options.handler(
        this,
        this.options.params
      );
      this.taskId = taskId;
      this.$emit("loadStatus");
      this.$emit("showTitle", taskTypeModel.getById(taskType).text);
    } catch (e) {
      this.$emit("accessDenied", e);
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    valueChanged(params) {
      this.$emit("valueChanged", params);
    }
  }
};
</script>

<style></style>
