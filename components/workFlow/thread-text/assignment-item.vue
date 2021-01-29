<template>
  <div>
    <div
      class="comment__item mY-1 ml-1"
      :class="{ 'current-comment': data.item.isCurrent }"
    >
      <div class="d-flex js-space-between">
        <div>
          <user-icon
            class="f-size-30"
            :fullName="data.item.author.name"
            :path="data.item.author.personalPhotoHash"
          />
        </div>
        <div>
          <div @click="() => toDetailAssignment(data.item.entity)" class="link">
            <span class="text-italic">{{
              parseSubject(data.item.entity)
            }}</span>
          </div>

          <div class="list__content d-flex">
            <threadTextComponentAuthor
              :author="data.item.author"
              :writtenBy="data.item.writtenBy"
            />
            <div>
              <i class="dx-icon dx-icon-event"></i>
              {{ formatDate(data.item.modificationDate) }}
            </div>
          </div>
        </div>
        <div class="thread-text-status">
          <div
            class="task__item"
            v-if="data.item.entity.deadline"
            :class="{ expired: data.item.isExpired }"
          >
            {{ $t("translations.fields.deadLine") }}:
            {{ formatDate(data.item.entity.deadline) }}
          </div>
          <component
            :is="showIndicatorComponent(data.item.entity)"
            :data="data.item.entity"
          />
        </div>
      </div>
      <div v-if="data.item.body" class="list__content message-body">
        {{ data.item.body }}
      </div>
    </div>
    <thread-text-component
      class="ml-1"
      :v-if="data.children && data.children.length"
      v-for="(item, index) in data.children"
      :data="item"
      :type="item.item.type"
      :key="index"
    />
  </div>
</template>
<script>
import AssignmentThreadTextModel from "../infrastructure/models/ThreadText/AssignmentThreadText.js";
import threadTextComponentAuthor from "./thread-text-item-components/author.vue";

import * as indicators from "./indicator-state/assignment-indicators/indicators.js";

import userIcon from "~/components/Layout/userIcon.vue";
export default {
  components: {
    threadTextComponentAuthor,
    ...indicators,
    userIcon,
    threadTextComponent: () => import("./thread-text-component.vue"),
  },
  name: "task-item",
  props: ["data"],
  computed: {
    assignmentThreadText() {
      return new AssignmentThreadTextModel(this);
    },
  },
  methods: {
    showIndicatorComponent(data) {
      return this.assignmentThreadText.getIndicatorByStatus(data);
    },
    toDetailAssignment(params) {
      this.assignmentThreadText.showCard(this, params);
    },
    parseSubject(entity) {
      return this.assignmentThreadText.generateSubject(entity);
    },
    formatDate(date) {
      return this.assignmentThreadText.formatDate(date);
    },
  },
};
</script>
<style></style>
