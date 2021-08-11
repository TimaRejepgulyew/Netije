<template>
  <div>
    <div>
      <div class="toolbar--position-top">
        <DxToolbar>
          <DxItem
            v-for="item in filterOptions"
            :options="{
              text: item.text,
              onClick: () => changeFilter(item.id),
            }"
            :type="filter === item.id ? 'default' : 'normal'"
            :key="item.id"
            location="before"
            widget="dxButton"
          />
          <DxItem
            :options="refreshOptions"
            location="after"
            widget="dxButton"
          />
        </DxToolbar>
      </div>
      <div class="tread-text__list">
        <DxList
          :hover-state-enabled="false"
          :activeStateEnabled="false"
          :focusStateEnabled="false"
          :data-source="comments"
          :search-enabled="false"
          height="50vh"
        >
          <template #item="item">
            <div class="list-container">
              <thread-text-component
                @valueChanged="reloadStore"
                :data="item.data"
                :type="item.data.item.type"
              />
            </div>
          </template>
        </DxList>
      </div>
    </div>
  </div>
</template>
<script>
import FilterThreadText from "../infrastructure/services/threadTextFilter.js";
import Filter from "../infrastructure/models/FilterText.js";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
import DxList from "devextreme-vue/list";
import FilterText from "../infrastructure/constants/filterText/index.js";
export default {
  services: {
    filter: null,
  },
  components: {
    DxToolbar,
    DxItem,
    DxList,
    threadTextComponent: async () =>
      await import(
        "~/components/workFlow/thread-text/thread-text-component.vue"
      ),
  },
  name: "thread-texts",
  props: ["id", "entityType", "isRefreshing"],
  watch: {
    isRefreshing: function (value) {
      if (value) {
        this.comments.reload();
        this.$emit("refreshed");
      }
    },
  },
  created() {
    // this.$options.services.filter = new FilterThreadText().filter;
  },
  data() {
    const url =
      this.entityType === "task"
        ? dataApi.task.TextsByTask
        : dataApi.assignment.TextsByAssignment;
    return {
      filter: 0,
      comments: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: `${url}${this.id}/${FilterText.All}`,
        }),
        paginate: false,
      }),
    };
  },
  methods: {
    async changeFilter(filter) {
      this.filter = filter;
      const data = await new FilterThreadText().filter({
        threadText: { name: "Test" },
        filter,
      });
      console.log(data);
      const url =
        this.entityType === "task"
          ? dataApi.task.TextsByTask
          : dataApi.assignment.TextsByAssignment;
      this.comments = new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: `${url}${this.id}/${filter}`,
        }),
        paginate: false,
      });
    },
    reloadStore() {
      setTimeout(() => {
        this.comments.reload();
      }, 3000);
    },
  },
  computed: {
    filterOptions() {
      return new Filter(this).getAll();
    },
    refreshOptions() {
      return {
        icon: "refresh",
        onClick: () => {
          this.comments.reload();
        },
      };
    },
  },
};
</script>
<style scoped>
.list-container {
  box-sizing: border-box;
  width: 100%;
}

.dx-list-item-content {
  padding: 0px;
}
.toolbar--position-top {
  z-index: 5;
  top: 0;
  overflow: hidden;
}
/* .tread-text__list{
  padding: 50px 0;
} */
</style>
