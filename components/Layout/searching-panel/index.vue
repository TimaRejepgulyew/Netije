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
      :onItemClick="openDocument"
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
import dataApi from "~/static/dataApi";
export default {
  components: {
    DxAutocomplete,
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
          name: "setting",
          options: {
            icon: settingIcon,
            stylingMode: "text",
            onClick: () => {
              this.$popup.searchSetting(
                this,
                {
                  entityTypeSearching: this.entityTypeSearching
                },
                {
                  width: "auto",
                  height: "auto",
                  showLoadingPanel: false,
                  // listeners: [
                  //   {
                  //     eventName: "valueChanged",
                  //     handlerName: "setEntityTypeSearching"
                  //   }
                  // ]
                }
              );
            }
          }
        }
      ];
    }
  },
  methods: {
    openDocument(e) {
      if (e.itemData !== null && typeof e.itemData !== "string") {
        this.$router.push(
          `/document-module/detail/${e.itemData.documentTypeGuid}/${e.itemData.id}`
        );
        this.name = null;
      }
    }
  }
};
</script>

<style></style>
