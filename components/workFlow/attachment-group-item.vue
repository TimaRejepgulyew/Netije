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
      <div class="scrool-auto">
        <documentGrid v-if="isOpenCard" :documentQuery="100" @selectedDocument="pasteAttachment" />
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
        :on-click="()=>{isOpenCard =!isOpenCard}"
      ></DxButton>
    </div>
    <ul v-if="hasGroupItem">
      <li v-for="groupItem in group.entities" :key="groupItem.entityId">
        <component @detach="detach" :is="componentByAttachmentType" :item="groupItem" />
      </li>
    </ul>
    <div
      class="d-flex group__description"
      :class="{'cursor-pointer':group.canAddAttachments}"
      @click="()=>{if(group.canAddAttachments)isOpenCard =!isOpenCard}"
      v-else
    >
      <i class="dx-icon dx-icon-link"></i>
      <label :for="'addAttachment'+group.groupId" class="f-grow-1">{{group.description}}</label>
    </div>
  </div>
</template>

<script>
import documentGrid from "~/components/paper-work/document-grid.vue";
import taskField from "~/components/workFlow/field-task-attachment.vue";
import documentField from "~/components/workFlow/field-document-attachment.vue";
import { DxButton } from "devextreme-vue";
import dataApi from "~/static/dataApi";
import DataSource from "devextreme/data/data_source";
import EntityTypes from "~/infrastructure/constants/entityTypes.js";
import DxSelectBox from "devextreme-vue/select-box";
import { DxPopup } from "devextreme-vue/popup";
import GroupAttachmentType from "~/infrastructure/constants/groupAttachmentType.js";
export default {
  components: {
    DxSelectBox,
    DxButton,
    documentGrid,
    DxPopup,
    documentField,
    taskField
  },
  data() {
    return {
      isOpenCard: false,
      attachment: null,
      documentStore: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.paperWork.AllDocument
        })
      })
    };
  },
  props: ["group"],
  methods: {
    detach(attachmentId) {
      this.$emit("detach", attachmentId);
    },
    pasteAttachment({ documentTypeguid, id }) {
      this.isOpenCard = !this.isOpenCard;
      this.$emit("pasteAttachment", {
        attachmentId: id,
        groupId: this.group.groupId
      });
    }
  },
  computed: {
    componentByAttachmentType() {
      switch (this.group.attachmentGroupType) {
        case GroupAttachmentType.Document:
          return "documentField";
        case GroupAttachmentType.Task:
          return "taskField";
      }
    },
    groupDemo() {
      let groupDemo = { ...this.group };
      groupDemo.entities = groupDemo.entities = [
        {
          entity: {
            type: 0,
            name: "Вх. письмо от вцфвцфвцф вфцвфцвц ",
            note: "adwdawd",
            ourSignatoryId: null,
            placedToCaseFileDate: null,
            preparedById: 16,
            registrationDate: null,
            registrationNumber: null,
            registrationState: 1,
            responsibleForReturnEmployeeId: null,
            returnDate: null,
            returnDeadline: null,
            scheduledReturnDateFromCounterparty: null,
            subject: "dwadaw",
            extension: ".pdf"
          },
          canDetach: true
        },
        {
          entity: {
            type: 1,
            name: "Вх. письмо от вцфвцфвцф вфцвфцвц ",
            note: "adwdawd",
            ourSignatoryId: null,
            placedToCaseFileDate: null,
            preparedById: 16,
            registrationDate: null,
            registrationNumber: null,
            registrationState: 1,
            responsibleForReturnEmployeeId: null,
            returnDate: null,
            returnDeadline: null,
            scheduledReturnDateFromCounterparty: null,
            subject: "dwadaw",
            extension: ".pdf"
          },
          canDetach: true
        }
      ];
      return groupDemo;
    },
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
.scrool-auto {
  width: 100%;
  overflow: auto;
}
ul {
  padding: 0;
  li {
    list-style: none;
  }
}
</style>