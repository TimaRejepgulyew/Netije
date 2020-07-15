<template>
  <div>
    <div class="comment__item mY-1 ml-1" :class="{'current-comment':comment.isCurrent}">
      <div class="d-flex js-space-between">
        <div>
          <icon-by-name class="f-size-30" :fullName="comment.author.name"></icon-by-name>
        </div>
        <div>
          <div @click="()=>toDetailTask(comment.entity)" class="link">
            <span class="text-italic">{{parseSubject(comment.entity.taskType)}}</span>
          </div>

          <div class="list__content d-flex">
            <div class="link" @click="()=>toDetailAuthor(comment.author.id)">
              <i class="dx-icon dx-icon-user"></i>
              {{ comment.author.name}}
            </div>
            <div>
              <i class="dx-icon dx-icon-event"></i>
              {{formatDate(comment.modificationDate)}}
            </div>
          </div>
        </div>
        <div class="task-state">
          <div
            class="task__item"
            v-if="comment.entity.deadline && displayDeadline(comment.type)"
            :class="{'expired':comment.isExpired}"
          >{{$t("translations.fields.deadLine")}}: {{formatDate(comment.entity.deadline)}}</div>
          <div class="d-flex task__item item--status">
            <img class="icon--status" :src="parseIconStatus(comment.entity.status)" />
            {{parseTextStatus(comment.entity.status)}}
          </div>
        </div>
      </div>
      <div v-if="comment.entity.body" class="list__content message-body">{{comment.entity.body}}</div>
    </div>
    <tread-text-mediator
      class="ml-1"
      :v-if="comment.children && comment.children.length"
      v-for="(item,index) in comment.children"
      :comment="item"
      :key="index"
    />
  </div>
</template>
<script>
import { taskStatusGeneratorObj } from "~/infrastructure/constants/taskStatus.js";
import { commentTextByTaskType } from "~/infrastructure/constants/taskType.js";
import iconByName from "~/components/Layout/iconByName.vue";
import WorkflowEntityTextType from "~/infrastructure/constants/workflowEntityTextType";
import moment from "moment";
export default {
  components: {
    iconByName,
    treadTextMediator: () =>
      import("~/components/workFlow/thread-text/text-mediator.vue")
  },
  name: "task-item",
  props: ["comment"],

  methods: {
    toDetailTask(params) {
      this.$emit("toDetailTask", params);
    },
    toDetailAuthor(id) {
      this.$emit("toDetailAuthor", id);
    },
    parseIconStatus(status) {
      return taskStatusGeneratorObj(this)[status]?.icon;
    },
    parseTextStatus(status) {
      return taskStatusGeneratorObj(this)[status].text;
    },
    parseSubject(value) {
      return commentTextByTaskType(this)[value]?.text;
    },
    formatDate(date) {
      return moment(date).format("MM.DD.YYYY HH:mm");
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
  filters: {}
};
</script>

<style lang="scss" scoped >
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.list__content {
  div {
    padding-right: 5px;
  }
}
.f-size-30 {
  margin: 5px;
  font-size: 20px;
}
.js-space-between {
  align-items: center;
}
.task-state {
  text-align: right;
  margin-left: auto;
  padding: 0 5px;
  font-size: 14px;
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
.current-comment {
  background: #ecfff46b;
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
.link:hover {
  text-decoration: underline;
  color: #f90;
}
</style>