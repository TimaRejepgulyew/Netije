<template>
  <div>
    <DxButton
      :disabled="readOnly"
      :on-click="showPopup"
      icon="more"
      stylingMode="text"
      :useSubmitBehavior="false"
      type="default"
    />
    <!-- <DxPopup
      :show-title="false"
      :visible.sync="isGridOpened"
      :drag-enabled="false"
      :close-on-outside-click="true"
      width="90%"
      height="95%"
    >
      <div class="scrool-auto">
        <document-grid
          @selectedDocument="
            (params) => {
              selectedDocument(params);
              togglePopup();
            }
          "
          v-if="isGridOpened"
          :isCard="true"
          :documentQuery="dataSourceQuery"
          :documentFilter="dataSourceFilter"
        />
      </div>
    </DxPopup> -->
  </div>
</template>

<script>
import documentGrid from "~/components/document-module/document-grid.vue";
import { DxButton } from "devextreme-vue";
export default {
  components: {
    documentGrid,
    DxButton,
  },
  props: {
    readOnly: {
      type: Boolean,
    },
    dataSourceFilter: {},
    dataSourceQuery: {},
  },
  data() {
    return {
      isGridOpened: false,
    };
  },
  methods: {
    showPopup() {
      this.$popup.documentGrid(
        this,
        {
          documentQuery: this.dataSourceQuery,
          documentFilter: this.dataSourceFilter,
        },
        {
          showLoadingPanel: false,
          listeners: [
            { eventName: "valueChanged", handlerName: "valueChanged" },
          ],
        }
      );
    },
    selectedDocument(params) {
      this.$emit("selectedDocument", params);
    },
  },
};
</script>

<style></style>
