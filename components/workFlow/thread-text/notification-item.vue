<template>
  <div>
    <div class="comment__item mY-1 ml-1" :class="{'current-comment':comment.isCurrent}">
      <div class="d-flex js-space-between">
        <div>
          <icon-by-name class="f-size-30" :fullName="comment.author.name"></icon-by-name>
        </div>
        <div>
          <div @click="()=>toDetailAssignment(comment.entity)" class="link">
            <span class="text-italic">{{parseSubject(comment.entity.assignmentType)}}</span>
          </div>

          <div class="list__content d-flex">
            <threadTextComponentAuthor :author="comment.author" @toDetailAuthor="toDetailAuthor" />
            <div>
              <i class="dx-icon dx-icon-event"></i>
              {{formatDate(comment.modificationDate)}}
            </div>
          </div>
        </div>
        <div class="task-state">
          <is-read-indicator :data="comment.entity" />
        </div>
      </div>
      <div v-if="comment.entity.body" class="list__content message-body">{{comment.entity.body}}</div>
    </div>
    <tread-text-mediator
      class="ml-1"
      @toDetailAuthor="(id)=>toDetail('toDetailAuthor',id)"
      @toDetailTask="(params)=>toDetail('toDetailTask',params)"
      @toDetailAssignment="(params)=>toDetail('toDetailAssignment',params)"
      :v-if="comment.children && comment.children.length"
      v-for="(item,index) in comment.children"
      :comment="item"
      :key="index"
    />
  </div>
</template>
<script>
import threadTextComponentAuthor from "~/components/workFlow/thread-text/thread-text-item-components/author.vue";
import { isReadIndicator } from "~/components/workFlow/thread-text/indicator-state/assignment-indicators/indicators.js";
import { assignmentTypeName } from "~/infrastructure/constants/assignmentType.js";
import iconByName from "~/components/Layout/iconByName.vue";
import WorkflowEntityTextType from "~/infrastructure/constants/workflowEntityTextType";
import moment from "moment";
export default {
  components: {
    threadTextComponentAuthor,
    iconByName,
    isReadIndicator,
    treadTextMediator: () =>
      import("~/components/workFlow/thread-text/text-mediator.vue"),
  },
  name: "task-item",
  props: ["comment"],

  methods: {
    isReadStatusText(isRead) {
      return isRead ? this.$t("shared.read") : this.$t("shared.unread");
    },
    isReadStatusIcon(isRead) {
      return isRead ? this.readIcon : this.unreadIcon;
    },
    toDetail(emitName, params) {
      this.$emit(emitName, params);
    },
    toDetailAssignment(params) {
      this.$emit("toDetailAssignment", params);
    },
    toDetailAuthor(id) {
      this.$emit("toDetailAuthor", id);
    },
    parseSubject(value) {
      return assignmentTypeName(this)[value]?.text;
    },
    formatDate(date) {
      return moment(date).format("DD.MM.YYYY HH:mm");
    },
    displayDeadline(type) {
      switch (type) {
        case WorkflowEntityTextType.Notice:
          return false;
        default:
          return true;
      }
    },
  },
};
</script>

