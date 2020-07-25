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
          <div v-if="!comment.entity.isRead" class="d-flex task__item item--status">
            <img class="icon--status" :src="unreadIcon" />
            {{$t('shared.unread')}}
          </div>
          <div v-else-if="comment.entity.result !==null" class="d-flex task__item item--status">
            <img class="icon--status" :src="parseIconResult(comment.entity.result)" />
            {{parseTextResult(comment.entity.result)}}
          </div>
          <div v-else class="d-flex task__item item--status">
            <img class="icon--status" :src="parseIconStatus(comment.entity.status)" />
            {{parseTextStatus(comment.entity.status)}}
          </div>
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
import unreadIcon from "~/static/icons/status/unread.svg";
import { assignmentStatusLocalization } from "~/infrastructure/constants/assignmentStatus.js";
import { generateElementsResult } from "~/infrastructure/constants/assignmentResult.js";
import { assignmentTypeName } from "~/infrastructure/constants/assignmentType.js";
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
  created() {
    console.log(
      this.resultStore(this),
      this.comment.entity.assignmentType,
      "testy"
    );
  },
  data() {
    return {
      unreadIcon,
      resultStore: generateElementsResult(this.comment.entity.assignmentType)
    };
  },
  methods: {
    toDetail(emitName, params) {
      this.$emit(emitName, params);
    },
    toDetailAssignment(params) {
      this.$emit("toDetailAssignment", params);
    },
    toDetailAuthor(id) {
      this.$emit("toDetailAuthor", id);
    },
    parseIconStatus(status) {
      return assignmentStatusLocalization(this)[status]?.icon;
    },
    parseTextStatus(status) {
      return assignmentStatusLocalization(this)[status]?.text;
    },
    parseIconResult(result) {
      return this.resultStore(this)[result]?.icon;
    },
    parseTextResult(result) {
      return this.resultStore(this)[result]?.text;
    },
    parseSubject(value) {
      return assignmentTypeName(this)[value]?.text;
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
  }
};
</script>

