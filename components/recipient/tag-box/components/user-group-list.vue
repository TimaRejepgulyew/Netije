<template>
  <div>
    <DxList
      ref="list"
      :data-source="resipientStore"
      :selected-items.sync="items"
      :search-enabled="true"
      search-mode="contains"
      search-expr="name"
      :height="360"
      :focusStateEnabled="false"
      :activeStateEnabled="false"
      :allowItemDeleting="true"
      display-expr="name"
      page-load-mode="scrollBottom"
      selection-mode="multiple"
      :menu-items="itemsMenu"
    >
      <template #item="{ data }">
        <div>
          <userGroup :data="data" />
        </div>
      </template>
    </DxList>
    <div class="button_group">
      <DxButton @click="createGroup" :width="120" :text="$t('buttons.create')" />
      <DxButton @click="sendRecipients" :width="120" :text="$t('buttons.save')" />
    </div>
  </div>
</template>


<script>
import DxButton from "devextreme-vue/button";
import DxList from "devextreme-vue/list";
import DataSource from "devextreme/data/data_source";
import userGroup from "~/components/recipient/tag-box/components/user-group-list-item.vue";

import dataApi from "~/static/dataApi";

export default {
  components: {
    DxList,
    userGroup,
    DxButton
  },
  data() {
    return {
      items: []
    };
  },
  computed: {
    resipientStore() {
      const dataSource = new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.userGroup.group,
          removeUrl: dataApi.userGroup.group
        }),
        paginate: true,
        pageSize: 10
      });
      return dataSource;
    },
    itemsMenu() {
      return [
        {
          text: this.$t("buttons.detail"),
          action: this.showCard
        }
      ];
    }
  },
  methods: {
    closeDropDown() {
      this.$emit("closeDropDown");
    },
    createGroup() {
      this.closeDropDown();
      this.$popup.userGroup(
        this,
        {},
        {
          width: "60vw",
          height: "60vh"
        }
      );
    },
    showCard(e) {
      this.closeDropDown();
      this.$popup.userGroup(
        this,
        {
          id: e.itemData.id
        },
        {
          width: "60vw",
          height: "60vh"
        }
      );
    },
    sendRecipients() {
      let newArray = this.items.map(item => {
        return item.participants;
      });
      let result = [].concat(...newArray);
      this.$emit("selectUserGroupItem", result);
      this.items = [];
    }
  }
};
</script>

<style lang="scss">
.button_group {
  display: flex;
  justify-content: flex-end;
  height: 40px;
}
</style>