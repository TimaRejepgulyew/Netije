<template>
  <div>
    <div class="list-container">
      <DxList
        :data-source="accessRight.entries"
        :focusStateEnabled="false"
        :activeStateEnabled="false"
        search-expr="recipient.name"
        :search-enabled="true"
      >
        <template #item="item">
          <div>
            <div class="d-flex js-center align-center">
              <div class="list__content d-flex align-center">
                <resipient-icon :type="item.data.recipient.recipientType"></resipient-icon>
                {{ item.data.recipient.name}}
              </div>
              <div class="list__btn-group d-flex">
                <attachment-action-btn
                  @reload="load"
                  :entryId="item.data.id"
                  :current-access-right="item.data.accessRightType"
                  :can-update="!item.data.canUpdate"
                  :accessRight="accessRight.accessRightTypes"
                />
                <DxButton
                  icon="trash"
                  type="danger"
                  styling-mode="text"
                  :disabled="!item.data.canRemove"
                  :on-click="()=>deleteRecipient(item.data.id)"
                />
              </div>
            </div>
          </div>
        </template>
      </DxList>
    </div>
    <div>
      <span class="dx-form-group-caption border-top">{{$t("translations.headers.addNewRecipient")}}</span>
      <div class="d-flex mt-2">
        <div class="dx-field-value pr-1">
          <label>{{$t("translations.fields.recipient")}}</label>
          <DxSelectBox
            v-model="newRecipient.recipientId"
            :data-source="recipientStore"
            :grouped="true"
            display-expr="name"
            value-expr="id"
            :showClearButton="true"
            :searchEnabled="true"
            searchExpr="name"
          >
            <template #group="{ data }">
              <recipient-list :data="data" />
            </template>
          </DxSelectBox>
        </div>
        <div class="dx-field-value">
          <label>{{$t("translations.fields.accessRight")}}</label>
          <DxSelectBox
            v-model="newRecipient.accessRightTypeId"
            :items="accessRightsStore"
            display-expr="name"
            :showClearButton="true"
            value-expr="id"
            :searchEnabled="true"
            searchExpr="name"
          ></DxSelectBox>
        </div>
      </div>
      <div class="dx-field-value mt-2">
        <DxButton
          type="success"
          :disabled="isRequired"
          :on-click="addRecipient"
          :text="$t('buttons.add')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import recipientList from "~/components/page/recipient-list.vue";
import { DxSelectBox } from "devextreme-vue/select-box";
import attachmentActionBtn from "~/components/page/access-right-action-btn";
import DxList from "devextreme-vue/list";
import dataApi from "~/static/dataApi";
import DataSource from "devextreme/data/data_source";
import { DxButton } from "devextreme-vue";
export default {
  components: {
    DxSelectBox,
    attachmentActionBtn,
    DxList,
    DxButton,
    recipientList
  },
  props: ["entityType", "entityId"],
  async created() {
    this.$awn.asyncBlock(
     this.$axios.get(`${dataApi.accessRights.List}${this.entityType}/${this.entityId}`),
      res => {
        this.accessRight = res.data;
      },
      () => this.$awn.alert()
    );
  },
  data() {
    return {
      accessRight: {},
      newRecipient: {
        recipientId: null,
        accessRightTypeId: null
      }
    };
  },
  methods: {
    async load() {
      const { data } = await this.$axios.get(`${dataApi.accessRights.List}${this.entityType}/${this.entityId}`);
      this.accessRight = data;
    },
    nullify() {
      this.newRecipient = {
        recipientId: null,
        accessRightTypeId: null,
        entityType:+this.entityType
      };
    },
    addRecipient() {
      const recipient = {
        ...this.newRecipient,
        entityId: +this.entityId,
        entityType:+this.entityType
      };
      this.$awn.asyncBlock(
        this.$axios.post(dataApi.accessRights.AddRecipient, recipient),
        async () => {
          this.nullify();
          await this.load();
          this.$awn.success();
        },
        () => {
          this.$awn.alert();
        }
      );
    },
    deleteRecipient(entryid) {
      this.$awn.asyncBlock(
        this.$axios.delete(dataApi.accessRights.RemoveRecipient + entryid),
        async () => {
          await this.load();
          this.$awn.success();
        },
        () => {
          this.$awn.alert();
        }
      );
    }
  },
  computed: {
    recipientStore() {
      return new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.recipient.list
        }),
        group: [{ selector: "recipientType" }]
      });
    },
    accessRightsStore() {
      return this.accessRight.accessRightTypes;
    },
    isRequired() {
      const { recipientId, accessRightTypeId } = this.newRecipient;
      return recipientId === null || accessRightTypeId == null;
    },
    btnSave() {
      return this.$store.getters["globalProperties/btnSave"](this);
    }
  }
};
</script>

<style lang="scss" >
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.border-top {
  margin-top: 20px;
  display: flex;
  border-top: 1px solid $base-border-color;
}
.pr-1 {
  padding-right: 10px;
}
.align-center {
  align-items: center;
}
.js-center {
  justify-content: space-between;
}
.list-container {
  overflow: auto;
  max-height: 60vh;
}
.dx-list-group-header {
  padding: 5px;
}
.selectbox--icon {
  display: flex;
  width: 20px;
}
.js-flex-start {
  justify-content: flex-start;
}
.mt-2 {
  padding-top: 20px;
}
</style>