<template>
  <div>
    <div class="comment__item mY-1" :class="{'current-comment':comment.isCurrent,...levelClass}">
      <div class="d-flex js-space-between">
        <div class="list__content">
          <img class="icon--type" :src="parseIconType(comment.type)" />
        </div>

        <div>
          <div>
            <span class="text-italic">{{comment.subject}}</span>
          </div>

          <div class="list__content">
            <i class="dx-icon dx-icon-user"></i>
            {{ comment.author}}
          </div>
          <div class="list__content">
            <i class="dx-icon dx-icon-event"></i>
            {{formatDate(comment.created)}}
          </div>
        </div>

        <div class="task-state">
          <div
            class="task__item"
            v-if="comment.entity.deadline && displayDeadline(comment.type)"
            :class="{'expired':comment.isExpired}"
          >{{$t("translations.fields.deadLine")}}: {{formatDate(comment.entity.deadline)}}</div>
          <div class="d-flex task__item item--status">
            <img class="icon--status" :src="[parseIconStatus(comment.icon)]" />
            {{comment.status}}
          </div>
        </div>
      </div>
      <div v-if="comment.body" class="list__content message-body">{{comment.body}}</div>
      <div v-if="comment.result" class="list__content message-body">
        <span class="text--bold">
          <i class="dx-icon dx-icon-info"></i>
          {{comment.result}}
        </span>
      </div>
    </div>

    <comment
      :v-if="comment.children && comment.children.length"
      :level="level+1"
      v-for="(item,index) in comment.children"
      :comment="item"
      :key="index"
    />
  </div>
</template>

<script>
import Comment from "~/components/workFlow/comments-item.vue";
import WorkflowEntityTextType from "~/infrastructure/constants/workflowEntityTextType";
import moment from "moment";
export default {
  components: {
    Comment
  },
  name: "comment",
  props: ["comment", "level"],
  methods: {
    parseIconStatus(icon) {
      return require(`~/static/icons/status/${icon}.svg`);
    },
    parseIconType(type) {
      switch (type) {
        case WorkflowEntityTextType.Task:
          return require("~/static/icons/iconAssignment/task.svg");
        case WorkflowEntityTextType.Notice:
          return require("~/static/icons/iconAssignment/notice.svg");
        case WorkflowEntityTextType.Assignment:
          return require("~/static/icons/iconAssignment/assignment.svg");
      }
    },
    formatDate(date) {
      return moment(date).format("MM.DD.YYYY hh:mm");
    },
    displayDeadline(type) {
      switch (type) {
        case WorkflowEntityTextType.Notice:
          return false;
        default:
          return true;
      }
    }
  },
  computed: {
    levelClass() {
      let obj = {};
      obj[`ml-${this.level}`] = true;
      return obj;
    }
  }
};
</script>

<style lang="scss" scoped >
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";

.js-space-between {
  align-items: center;
}
.task-state {
  text-align: right;
  margin-left: auto;
  padding: 0 5px;
  font-size: 16px;
  i {
    font-size: 16px;
    margin: 0 5px;
  }
}
.task__item {
  padding: 5px 0;
}
.mY-1 {
  margin: 10px 0;
}
.ml-1 {
  margin-left: 1.2em;
}
.ml-2 {
  margin-left: 1.4em;
}
.ml-3 {
  margin-left: 1.6em;
}
.current-comment {
  background: #ecfff46b;
}
.icon--type {
  display: flex;
  width: 30px;
  height: 100%;
}
.item--status {
  justify-content: flex-end;
  .icon--status {
    margin: 0 5px;
    display: flex;
    width: 20px;
    height: 100%;
  }
}
.message-body {
  margin-left: 30px;
}
.comment__item {
  box-sizing: border-box;
  white-space: normal;
  border: 1px solid $base-border-color;
  border-left: 2px solid $base-accent;
  padding: 5px 0;
  border-radius: 2px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.expired {
  color: red;
}
.text--bold {
  font-weight: 500;
}
.text-italic {
  font-style: italic;
}
</style>