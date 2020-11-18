<template>
  <div>
    <DxButton
      :disabled="readOnly"
      :on-click="togglePopup"
      icon="more"
      stylingMode="text"
    
      :useSubmitBehavior="false"
      type="default"
    ></DxButton>
    <DxPopup
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
            params => {
              selectedDocument(params);
              togglePopup();
            }
          "
          v-if="isGridOpened"
          :isCard="true"
          :documentQuery="dataSourceQuery"
        />
      </div>
    </DxPopup>
  </div>
</template>

<script>
import documentGrid from "~/components/document-module/document-grid.vue";
import { DxButton } from "devextreme-vue";
import { DxPopup } from "devextreme-vue/popup";
export default {
  components: {
    documentGrid,
    DxButton,
    DxPopup
  },
  props: {
    readOnly: {
      type: Boolean
    },
    dataSourceFilter: {},
    dataSourceQuery: {}
  },
  data() {
    return {
      isGridOpened: false
    };
  },
  methods: {
    togglePopup() {
      this.isGridOpened = !this.isGridOpened;
    },
    selectedDocument(params) {
      this.$emit("selectedDocument", params);
    }
  }
};
</script>

<style></style>
