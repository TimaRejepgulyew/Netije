<template>
  <div>
    <div class="file-uploader-block">
      <span class="dx-form-group-caption border-b">{{
        $t("document.groups.captions.versions")
      }}</span>
      <div class="d-flex">
        <DxButton
          :hint="$t('buttons.refresh')"
          class="refresh-btn"
          icon="refresh"
          :onClick="refresh"
        ></DxButton>
        <createVersionBtn @uploadVersion="refresh" :documentId="documentId" />
      </div>
      <div class="list-container">
        <DxList
          :data-source="versions"
          :activeStateEnabled="false"
          :focusStateEnabled="false"
        >
          <template #item="item">
            <docVersionListItem
              @refresh="refresh"
              :documentId="documentId"
              :item="item"
            />
          </template>
        </DxList>
      </div>
    </div>
  </div>
</template>
<script>
import createVersionBtn from "~/components/document-module/main-doc-form/toolbar/create-version-btn.vue";
import docVersionListItem from "~/components/document-module/main-doc-form/doc-version-list-item.vue";
import dataApi from "~/static/dataApi";
import DataSource from "devextreme/data/data_source";
import DxList from "devextreme-vue/list";
import { DxButton } from "devextreme-vue";
export default {
  components: {
    DxList,
    DxButton,
    createVersionBtn,
    docVersionListItem,
  },
  props: ["documentId"],
  data() {
    return {
      versions: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: `${dataApi.documentModule.Version}${this.documentId}`,
        }),
        sort: [{ selector: "number", desc: true }],
      }),
    };
  },
  computed: {
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
  },
  methods: {
    refresh() {
      this.versions.reload();
    },
  },
};
</script>
<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
.file-uploader-block {
  background: $base-bg;
  display: block;
  padding: 20px;
  margin: 0;
  border: 0.5px solid $base-border-color;
  border-radius: 5px;
  width: 350px;
  min-height: 100%;
  .border-b {
    display: block;
    width: 100%;
    padding-bottom: 7px;
  }

  .list-container {
    margin: 0;
    min-height: 65vh;
    overflow: auto;
    width: 100%;
    i {
      display: inline;
    }
    .list__btn-group {
      margin-left: auto;
    }
  }
}
.refresh-btn {
  margin-bottom: 10px;
}
</style>
