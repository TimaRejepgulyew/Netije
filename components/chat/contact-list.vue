<template>
  <div id="list_container">
    <DxList :data-source="contacts" height="100%" :search-enabled="true" search-expr="name">
      <template #item="{ data }">
        <custom-select-item :item-data="data" />
      </template>
    </DxList>
    <!-- <div class="notifications_btn">Уведомления</div> -->
  </div>
</template>


<script>
import DxList from "devextreme-vue/list";
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
import customSelectItem from "~/components/employee/custom-select-box-item.vue";

export default {
  components: {
    DxList,
    customSelectItem
  },
  data() {
    return {};
  },
  computed: {
    contacts() {
      const dataSource = new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.company.Employee
        }),
        paginate: false,
        pageSize: 10,
        displayExpr: "name"
      });
      return dataSource;
    }
  }
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";

#list_container {
  padding: 10px 10px 10px 10px;
  height: 100%;
  border-right: 1px solid $base-border-color;
  .notifications_btn {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    background-color: red;
  }
}
</style>