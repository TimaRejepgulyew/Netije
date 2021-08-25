<template>
  <div class="d-flex align-stretch align-items-center">
    <div class="link d-flex f-grow-1" @dblclick="() => showCard(item.entity)">
      <div class="icon">
        <taskIcon :taskTypeGuid="item.entity.taskType" />
      </div>
      <div class="max-width-5vw">{{ item.entity.subject }}</div>
    </div>
    <actionBtn @showCard="() => showCard(item.entity)" :attachment="item" />
  </div>
</template>

<script>
import taskIcon from "~/components/page/task-icon.vue";
import actionBtn from "~/components/workFlow/attachment/attachment-task-action-btn.vue";
export default {
  components: {
    taskIcon,
    actionBtn,
  },
  props: ["item"],
  methods: {
    showCard(task) {
      this.$emit("showCard", task);
    },
  },
};
</script>

<style lang="scss" scoped>
.align-stretch {
  align-content: stretch;
}
.max-width-5vw {
  max-width: 20vw;
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
