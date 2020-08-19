<template>
  <div>
    <DxPopup
      width="90%"
      height="90%"
      :showTitle="false"
      :visible.sync="isOpenCard"
      :drag-enabled="false"
      :close-on-outside-click="true"
    >
      <div>
        <task-card v-if="isOpenCard" :taskId="taskId" :isCard="true" @onSave="reloadAttachmment" />
      </div>
    </DxPopup>
    <div class="d-flex align-center">
      <span class="dx-form-group-caption">{{group.groupTitle}}</span>
      <sup v-if="group.isRequired" class="red">*</sup>
      <DxButton
        :id="'addAttachment'+group.groupId"
        class="btn--green"
        :visible="group.canAddAttachments"
        icon="plus"
        styling-mode="text"
        :hint="$t('buttons.add')"
        :on-click="openPopup"
      ></DxButton>
    </div>
    <ul v-if="hasGroupItem">
      <li v-for="groupItem in group.entities" :key="groupItem.entityId">
        <taskField @detach="detach" @showCard="showCard" :item="groupItem" />
      </li>
    </ul>
    <div
      class="d-flex group__description"
      :class="{'cursor-pointer':group.canAddAttachments}"
      @click="()=>{if(group.canAddAttachments)tooglePopup()}"
      v-else
    >
      <i class="dx-icon dx-icon-link"></i>
      <label :for="'addAttachment'+group.groupId" class="f-grow-1">{{group.description}}</label>
    </div>
  </div>
</template>

<script>
import {
  createActionItemExicutionTask,
  load
} from "~/infrastructure/services/taskService.js";
import { mapToEntityType } from "~/infrastructure/constants/taskType.js";
import taskField from "~/components/workFlow/field-task-attachment.vue";
import { DxButton } from "devextreme-vue";
import dataApi from "~/static/dataApi";
import DataSource from "devextreme/data/data_source";
import EntityTypes from "~/infrastructure/constants/entityTypes.js";
import DxSelectBox from "devextreme-vue/select-box";
import { DxPopup } from "devextreme-vue/popup";
import taskCard from "~/components/task/index.vue";
export default {
  components: {
    DxSelectBox,
    DxButton,
    DxPopup,
    taskField,
    taskCard: async () => {
      return await import("~/components/task/index.vue");
    }
  },
  name: "attachment-group-task",
  data() {
    return {
      taskId: null,
      isOpenCard: false
    };
  },

  props: ["group", "assignmentId"],
  methods: {
    showCard({ id, taskType }) {
      this.$awn.asyncBlock(load(this, { taskType, taskId: id }), () => {
        this.taskId = id;
        this.tooglePopup();
      });
    },
    tooglePopup() {
      this.isOpenCard = !this.isOpenCard;
    },
    openPopup() {
      this.$awn.asyncBlock(
        createActionItemExicutionTask(this, this.assignmentId),
        ({ taskId, taskType }) => {
          this.taskId = taskId;
          this.tooglePopup();
        }
      );
    },
    detach(attachmentId) {
      this.$emit("detach", attachmentId);
    },
    reloadAttachmment() {
      this.$emit("reloadAttachment");
      this.isOpenCard = false;
    }
  },
  computed: {
    hasGroupItem() {
      return this.group.entities;
    }
  }
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
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