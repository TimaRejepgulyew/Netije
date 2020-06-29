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
        <documentGrid :documentTypeGuid="100" @selectedDocument="pasteAttachment" />
      </div>
    </DxPopup>
    <div class="d-flex align-center">
      <span class="dx-form-group-caption border-b">{{group.groupTitle}}</span>
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
      <li v-for="groupItem in groupDemo.entities" :key="groupItem.entityId">
        <documentListItem :item="groupItem" />
        <!-- <component is="documentListItem" :item="groupItem" /> -->
      </li>
    </ul>
    <div class="d-flex group__description" v-else>
      <i class="dx-icon dx-icon-link"></i>
      <label :for="'addAttachment'+group.groupId" class="f-grow-1">{{group.description}}</label>
    </div>
  </div>
</template>

<script>
import documentGrid from "~/components/paper-work/document-grid.vue";
import documentListItem from "~/components/workFlow/attachmentEntityTypedocument.vue";
import { DxButton } from "devextreme-vue";
import dataApi from "~/static/dataApi";
import DataSource from "devextreme/data/data_source";
import EntityTypes from "~/infrastructure/constants/entityTypes.js";
import DxSelectBox from "devextreme-vue/select-box";
import { DxPopup } from "devextreme-vue/popup";
export default {
  components: {
    DxSelectBox,
    DxButton,
    documentGrid,
    DxPopup,
    documentListItem
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
    pasteAttachment() {
      this.isOpenCard = !this.isOpenCard;
    }
  },
  computed: {
    groupDemo() {
      let groupDemo = { ...this.group };
      groupDemo.entities = groupDemo.entities = [
        {
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
          subject: "dwadaw"
        }
      ];
      return groupDemo;
    },
    hasGroupItem() {
      return true;
    }
  }
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
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
</style>