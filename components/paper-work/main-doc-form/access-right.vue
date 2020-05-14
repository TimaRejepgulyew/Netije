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
              <div class="list__btn-group">
                <attachment-action-btn
                  :current-access-right="item.data.accessRightType"
                  :can-update="item.data.canUpdate"
                  :accessRight="accessRight.accessRightTypes"
                />
              </div>
            </div>
          </div>
        </template>
      </DxList>
    </div>
    <DxForm
      :visible="accessRight.canAdd"
      ref="form"
      :form-data.sync="recipient"
      :show-colon-after-label="true"
      :show-validation-summary="true"
    >
      <DxGroupItem :col-count="2" :caption="$t('translations.headers.addNewRecipient')">
        <DxSimpleItem
          :editor-options="resipientOptions"
          editor-type="dxSelectBox"
          data-field="recipient"
        >
          <DxLabel location="top" :text="$t('translations.fields.recipient')" />
          <DxRequiredRule :message="$t('translations.fields.recipientRequired')" />
        </DxSimpleItem>
        <DxSimpleItem
          data-field="accessRight"
          editor-type="dxSelectBox"
          :editor-options="accessRightsOptions"
        >
          <DxRequiredRule :message="$t('translations.fields.accessRightRequired')" />
          <DxLabel location="top" :text="$t('translations.fields.accessRight')" />
        </DxSimpleItem>
        <DxButtonItem :col-span="1" :button-options="btnSave" horizontal-alignment="left" />
      </DxGroupItem>
    </DxForm>
  </div>
</template>

<script>
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
  DxRequiredRule,
  DxButtonItem
} from "devextreme-vue/form";
import ResipientType from "~/infrastructure/constants/resipientType.js";
import resipientIcon from "~/components/paper-work/main-doc-form/resipient-icon.vue";
import attachmentActionBtn from "~/components/paper-work/main-doc-form/access-right-action-btn";
import DxList from "devextreme-vue/list";
import dataApi from "~/static/dataApi";
import DataSource from "devextreme/data/data_source";
import { DxButton } from "devextreme-vue";
export default {
  components: {
    DxForm,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule,
    attachmentActionBtn,
    resipientIcon,
    DxList,
    DxButtonItem,
    DxButton
  },
  props: ["url"],
  async created() {
    if (this.$route.params.id !== "add") {
      const { data } = await this.$axios.get(this.url);
      this.accessRight = data;
    }
  },
  data() {
    return {
      accessRight: {}
    };
  },
  methods: {
    // showGroupCaption(recipientType) {
    //   switch (recipientType) {
    //     case ResipientType.BusinessUnit:
    //       return this.$t("menu.businessUnit");
    //     case ResipientType.Department:
    //       return this.$t("menu.department");
    //     case ResipientType.Role:
    //       return this.$t("menu.role");
    //     case ResipientType.Group:
    //       return this.$t("menu.group");
    //     case ResipientType.Employee:
    //       return this.$t("menu.employee");
    //   }
    // }
  },
  computed: {
    resipientOptions() {
      return {
        dataSource: new DataSource({
          store: this.$dxStore({
            key: "id",
            loadUrl: dataApi.recipient.list
          })
          //   group: "recipientType"
          //   map: items => {
          //     let item = {};
          //     item = items;
          //     item.key = this.showGroupCaption(item.recipientType);
          //     console.log(item);
          //     return item;
          //   }
        }),
        // grouped: true,
        showClearButton: true,
        valueExpr: "id",
        displayExpr: "name"
      };
    },
    accessRightsOptions() {
      return {
        dataSource: this.accessRight.accessRightTypes,
        showClearButton: true,
        valueExpr: "id",
        displayExpr: "name"
      };
    },
    btnSave() {
      return this.$store.getters["globalProperties/btnSave"](this);
    }
  }
};
</script>

<style>
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
</style>