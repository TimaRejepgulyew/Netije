<template>
  <div class="d-flex align-stretch align-items-center">
    <div class="link d-flex f-grow-1" @dblclick="()=>showCard(item.entity)">
      <div class="icon">
        <img :src="actionItemExecutionIcon" />
      </div>
      <div>{{$t("task.prefixes.actionItemExecutionTask")}}: {{item.entity.subject}}</div>
    </div>
    <actionBtn @showCard="()=>showCard(item.entity)" :attachment="item" />
  </div>
</template>

<script>
import DocumentService from "~/infrastructure/services/documentVersionService";
import actionBtn from "~/components/workFlow/attachment-task-action-btn.vue";
import actionItemExecutionIcon from "~/static/icons/actionItemExecution.svg";
export default {
  components: {
    actionBtn
  },
  props: ["item"],
  data() {
    return {
      actionItemExecutionIcon
    };
  },
  methods: {
    showCard(task) {
      this.$emit("showCard", task);
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