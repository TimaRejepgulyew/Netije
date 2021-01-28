<template>
  <DxList
    ref="list"
    :data-source="resipientStore"
    :selected-items.sync="items"
    :search-enabled="true"
    search-mode="contains"
    search-expr="name"
    :height="400"
    :focusStateEnabled="false"
    :activeStateEnabled="false"
    display-expr="name"
    page-load-mode="scrollBottom"
    selection-mode="multiple"
  >
    <template #item="{ data }">
      <div>
        <component :data="data" :is="listItemByType(data.recipientType)" />
      </div>
    </template>
  </DxList>
</template>


<script>
import DxList from "devextreme-vue/list";
import DataSource from "devextreme/data/data_source";

import defaultType from "~/components/recipient/components/list-item/default.vue";
import employeeTypeComponent from "~/components/recipient/components/list-item/employee-type.vue";

import recipientType from "~/infrastructure/constants/resipientType.js";
import dataApi from "~/static/dataApi";

export default {
  components: {
    DxList,
    employeeTypeComponent,
    defaultType
  },
  props: {
    selectedItems: {},
    groupType: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      items: this.selectedItems
    };
  },
  watch: {
    selectedItems(value) {
      this.items = value;
    },
    items(value) {
      this.$emit("selectItem", value);
    }
  },
  computed: {
    isUserGroup() {
      return this.groupType[0] === recipientType.isUserGroup;
    },
    resipientFilter() {
      let filter = ["recipientType", "=", this.groupType[0]];
      if (this.groupType.length > 1) {
        filter = [];
        this.groupType.forEach(item => {
          filter.push(["recipientType", "=", item]);
          filter.push("or");
        });
      }
      return filter;
    },
    resipientStore() {
      const dataSource = new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.recipient.list
        }),
        paginate: true,
        pageSize: 10,
        filter: this.resipientFilter,
        sort: [{ selector: "recipientType", desc: false }]
      });
      return dataSource;
    }
  },
  methods: {
    listItemByType(type) {
      switch (type) {
        case recipientType.Employee:
          return "employeeTypeComponent";
        default:
          return "defaultType";
      }
    }
  }
};
</script>