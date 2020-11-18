<template>
  <div>
    <DxButton
      :visible="canShowInfo"
      :on-click="this.openCard"
      icon="info"
      stylingMode="text"
      :hint="$t('translations.fields.moreAbout')"
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
          v-if="isGridOpened"
          @onSaved="valueChanged"
          @onSelected="valueChanged"
          :isCard="true"
          documentQuery:dataSourceOptions.query
        />
      </div>
    </DxPopup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDocumentId: null,
      isGridOpened: false
    };
  }
};
</script>

<style></style>
