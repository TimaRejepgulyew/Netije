<template>
  <div>
    <div class="d-flex align-center">
      <span class="dx-form-group-caption">{{ group.groupTitle }}</span>
      <sup v-if="group.isRequired" class="red">*</sup>
      <addResolutonBtn
       v-if="group.canAddAttachments"
        :id="'addAttachment' + group.groupId"
        @createTask="createTask"
      />
    </div>
    <ul v-if="hasGroupItem">
      <li v-for="groupItem in group.entities" :key="groupItem.entityId">
        <taskField @detach="detach" @showCard="showCard" :item="groupItem" />
      </li>
    </ul>
    <div
      class="d-flex group__description"
      :class="{ 'cursor-pointer': group.canAddAttachments }"
      @click="
        () => {
          if (group.canAddAttachments) createTask();
        }
      "
      v-else
    >
      <i class="dx-icon dx-icon-link"></i>
      <label :for="'addAttachment' + group.groupId" class="f-grow-1">{{
        group.description
      }}</label>
    </div>
  </div>
</template>

<script>
import {
  createActionItemExicutionTask,
  load,
} from "../infrastructure/services/taskService.js";
import TaskType from "../infrastructure/constants/taskType.js";
import taskField from "./field-task-attachment.vue";
import { DxButton } from "devextreme-vue";
import DxSelectBox from "devextreme-vue/select-box";
import addResolutonBtn from "./attachment-components/add-resolution-btn.vue";
export default {
  components: {
    DxSelectBox,
    DxButton,
    taskField,
    addResolutonBtn,
  },
  name: "attachment-group-task",
  data() {
    return {
      taskId: null,
      isOpenCard: false,
    };
  },

  props: ["group", "assignmentId"],
  methods: {
    showCard({ id, taskType }) {
      this.$popup.taskCard(
        this,
        {
          params: { taskType, taskId: id },
          handler: load,
        },
        {
          listeners: [
            { eventName: "valueChanged", handlerName: "reloadAttachmment" },
          ],
        }
      );
    },

    createTask(params) {
      this.$popup.taskCard(
        this,
        {
          params: {
            parentAssignmentId: this.assignmentId,
            taskType: params
              ? params.taskType
              : TaskType.ActionItemExecutionTask,
          },
          handler: createActionItemExicutionTask,
        },
        {
          listeners: [
            { eventName: "valueChanged", handlerName: "reloadAttachmment" },
          ],
        }
      );
    },
    detach(attachmentId) {
      this.$emit("detach", attachmentId);
    },
    reloadAttachmment() {
      this.$emit("reloadAttachment");
    },
  },
  computed: {
    hasGroupItem() {
      return this.group.entities;
    },
  },
};
</script>

<style lang="scss">
.red {
  color: red;
  font-size: 17px;
}
.f-grow-1 {
  flex-grow: 1;
}
.group__description {
  padding: 20px 10px;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: darken($base-border-color, 30%);
  .dx-icon.dx-icon-link {
    font-size: 20px;
    padding-right: 10px;
  }
}
.cursor-pointer,
.cursor-pointer label {
  cursor: pointer;
}
.align-center {
  align-items: center;
}
.btn--green {
  margin-left: 10px;

  font-size: 20px;
  font-weight: bold;
  .dx-icon-plus {
    color: $base-accent;
    padding: 0;
    font-size: 20px;
  }
}
.pb-1 {
  padding-bottom: 10px;
}

ul {
  padding: 0;
  li {
    list-style: none;
  }
}
</style>
