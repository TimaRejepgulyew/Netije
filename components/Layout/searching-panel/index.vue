<template>
  <div>
    <DxAutocomplete
      stylingMode="text"
      :buttons="searchButtons"
      width="20vw"
      id="search-panel"
      :data-source="documents"
      :value.sync="name"
      :show-clear-button="true"
      :min-search-length="2"
      :search-timeout="300"
      displayValue="name"
      value-expr="name"
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
export default {
  components: {
    DxAutocomplete
  },
  data() {
    return {
      name: null,
      documents: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.documentModule.AllDocument
        }),
        paginate: true,
        pageSize: 10
      }),
      searchingType: localStorage.hasOwnProperty("searching-by-entity")
        ? +localStorage.getItem("searching-by-entity")
        : searchingTypes.Document
    };
  },
  computed: {
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
            focusStateEnabled: false
          }
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
            focusStateEnabled: false
          }
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
                  searchingType: this.searchingType
                },
                {
                  width: "auto",
                  height: "auto",
                  showLoadingPanel: false,
                  listeners: [
                    {
                      eventName: "valueChanged",
                      handlerName: "setSearchingType"
                    }
                  ]
                }
              );
            }
          }
        }
      ];
    }
  },

  methods: {
    setSearchingType({ searchingType }) {
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
      this.$router.push(
        `/assignment/more/${e.itemData.assignmentType}/${e.itemData.id}`
      );
    },
    openDocument(e) {
      this.$router.push(
        `/document-module/detail/${e.itemData.documentTypeGuid}/${e.itemData.id}`
      );
    }
  }
};
</script>

<style></style>
