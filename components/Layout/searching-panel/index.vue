<template>
  <div>
    <DxAutocomplete
      stylingMode="text"
      :buttons="searchButtons"
      width="20vw"
      id="search-panel"
      :data-source="dataSource"
      :value.sync="name"
      :show-clear-button="true"
      :min-search-length="3"
      :search-timeout="1000"
      :displayValue="valueExpr"
      :value-expr="valueExpr"
      :onItemClick="openEntity"
      :placeholder="$t('shared.search')"
    >
    </DxAutocomplete>
  </div>
</template>

<script>
import settingIcon from "./infrastructure/icon/setting.svg";
import { DxAutocomplete } from "devextreme-vue/autocomplete";
import DataSource from "devextreme/data/data_source";
import searchingTypes from "./infrastructure/constant/searchingTypes.js";
import SearchingTypesModel from "./infrastructure/model/searchingTypes.js";
import dataApi from "~/static/dataApi";
import AssignmentQuery from "~/components/workFlow/infrastructure/constants/query/assignmentQuery.js";
import AssignmentQuickFilter from "~/components/workFlow/infrastructure/constants/quickFilter/assignmentQuickFilter.js";
import TaskQuery from "~/components/workFlow/infrastructure/constants/query/taskQuery.js";
import TaskQuickFilter from "~/components/workFlow/infrastructure/constants/quickFilter/taskQuickFilter.js";
export default {
  components: {
    DxAutocomplete,
  },
  data() {
    return {
      name: null,
      documentStore: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.documentModule.AllDocument,
        }),
        paginate: true,
        pageSize: 10,
      }),
      taskStore: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: `${dataApi.task.Task}${TaskQuery.All}/${TaskQuickFilter.All}`,
        }),
        paginate: true,
        pageSize: 10,
      }),
      assignmentStore: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: `${dataApi.assignment.Assignments}${AssignmentQuery.All}/${AssignmentQuickFilter.All}`,
        }),
        paginate: true,
        pageSize: 10,
      }),
      dataSource: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.documentModule.AllDocument,
        }),
        paginate: true,
        pageSize: 10,
      }),
      searchingType: localStorage.hasOwnProperty("searching-by-entity")
        ? +localStorage.getItem("searching-by-entity")
        : searchingTypes.Document,
    };
  },
  computed: {
    valueExpr() {
      if (this.searchingType === searchingTypes.Document) return "name";
      else return "subject";
    },
    searchingModel() {
      return new SearchingTypesModel(this).getById(this.searchingType);
    },
    searchButtons() {
      return [
        {
          location: "before",
          name: "searchIcon",
          options: {
            icon: "search",
            stylingMode: "text",
            hoverStateEnabled: false,
            activeStateEnabled: false,
            focusStateEnabled: false,
          },
        },
        {
          location: "after",
          name: "searchTypeIcon",
          options: {
            icon: this.searchingModel.icon,
            hint: this.searchingModel.text,
            stylingMode: "text",
            hoverStateEnabled: false,
            activeStateEnabled: false,
            focusStateEnabled: false,
          },
        },
        {
          location: "after",
          name: "setting",
          options: {
            icon: settingIcon,
            hint: this.$t("searching.searchSetting"),
            stylingMode: "text",
            onClick: () => {
              this.$popup.searchSetting(
                this,
                {
                  searchingType: this.searchingType,
                },
                {
                  width: "auto",
                  height: "auto",
                  showLoadingPanel: false,
                  listeners: [
                    {
                      eventName: "valueChanged",
                      handlerName: "setSearchingType",
                    },
                  ],
                }
              );
            },
          },
        },
      ];
    },
  },

  methods: {
    setStore(searchingType) {
      switch (searchingType) {
        case searchingTypes.Document:
          this.dataSource = this.documentStore;
          break;
        case searchingTypes.Task:
          this.dataSource = this.taskStore;
          break;
        case searchingTypes.Assignment:
          this.dataSource = this.assignmentStore;
          break;
      }
      this;
    },
    setSearchingType({ searchingType }) {
      this.setStore(searchingType);
      this.searchingType = searchingType;
      localStorage.setItem("searching-by-entity", this.searchingType);
      this.name = null;
    },
    openEntity(e) {
      if (e.itemData !== null && typeof e.itemData !== "string") {
        switch (this.searchingType) {
          case searchingTypes.Document:
            this.openDocument(e);
            break;
          case searchingTypes.Assignment:
            this.openAssignment(e);
            break;
          case searchingTypes.Task:
            this.openTask(e);
            break;
        }
        this.name = null;
      }
    },
    openTask(e) {
      this.$router.push(`/task/detail/${e.itemData.taskType}/${e.itemData.id}`);
    },
    openAssignment(e) {
      this.$router.push(`/assignment/more/${e.itemData.id}`);
    },
    openDocument(e) {
      this.$router.push(
        `/document-module/detail/${e.itemData.documentTypeGuid}/${e.itemData.id}`
      );
    },
  },
};
</script>

<style></style>
