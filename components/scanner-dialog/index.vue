<template>
  <form @submit.prevent="scanDocument">
    <DxLoadPanel :visible.sync="isLoading" :indicatorSrc="indicatorIcon" />
    <Header
      :headerTitle="$t('scanner.header')"
      :isbackButton="false"
      :isNew="false"
    >
      <DxButton
        slot="toolbar"
        icon="close"
        styling-mode="text"
        @click="closeScanDialog"
      />
    </Header>
    <toolbar
      class="toolbar-scanner"
      :documentValidatorName="documentValidatorName"
    />
    <main class="d-flex">
      <template v-if="!isFilesEmpty">
        <left-side-bar class="left-side-bar"></left-side-bar>
        <current-page class="main" />
      </template>
      <div class="main" v-else>
        <scanner-icon />
        {{ $t("scanner.downloadfile") }}
      </div>
      <right-side-bar
        :documentValidatorName="documentValidatorName"
        class="right-side-bar"
      />
    </main>
  </form>
</template>

<script>
import indicatorIcon from "~/static/icons/loading.gif";
import { mapActions, mapGetters, mapMutations } from "vuex";
import Header from "~/components/page/page__header";
import scannerIcon from "~/components/scanner-dialog/scanner-icon.vue";
import currentPage from "./components/current-page.vue";
import leftSideBar from "./components/left-side-nav-bar.vue";
import toolbar from "./components/toolbar.vue";
import rightSideBar from "./components/right-side-nav-bar.vue";
import { DxButton } from "devextreme-vue";
import { DxLoadPanel } from "devextreme-vue/load-panel";
import { confirm } from "devextreme/ui/dialog";
export default {
  components: {
    Header,
    scannerIcon,
    toolbar,
    currentPage,
    leftSideBar,
    rightSideBar,
    DxButton,
    DxLoadPanel,
  },
  data() {
    return {
      indicatorIcon,
      documentValidatorName: "scannerParamsFormValidator",
    };
  },
  destroyed() {
    this.onClose();
  },
  methods: {
    ...mapActions({
      onClose: "scanner/onClose",
    }),
    ...mapMutations({
      toggleLoading: "scanner/TOGGLE_LOADING",
    }),
    onFileSaved(file) {
      this.$emit("fileSaved", { file });
    },
    scanDocument() {
      this.$store.dispatch("scanner/scanDocument");
      this.toggleLoading();
      setTimeout(() => {
        if (this.isLoading) this.toggleLoading();
      }, 1000 * 60);
    },
    async closeScanDialog() {
      if (!this.isFilesEmpty) {
        const confirmMessage = this.isLoading
          ? this.loadingConfirm
          : this.notSaveConFirm;
        const result = await confirm(...confirmMessage);
        if (!result) return;
      }
      this.$emit("closeScanDialog");
    },
  },
  computed: {
    ...mapGetters({
      isFilesEmpty: "scanner/isFilesEmpty",
      isLoading: "scanner/isLoading",
      file: "scanner/file",
    }),
    hasActivePage() {
      return this.$store.getters["scanner/currentPageId"] != null;
    },
    loadingConfirm() {
      return [this.$t("scanner.confirm.loading"), this.$t("shared.areYouSure")];
    },
    notSaveConFirm() {
      return [this.$t("scanner.confirm.notSave"), this.$t("shared.areYouSure")];
    },
  },
  watch: {
    file: function (newValue, oldValue) {
      const test = this.onFileSaved;
      function* fileSaved() {
        yield test(newValue);
      }
      fileSaved().next();
    },
  },
};
</script>

<style lang="scss">
.left-side-bar {
  overflow-y: scroll;
  overflow-x: hidden;
  width: 20%;
  flex-basis: 20%;
}
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f4f4f4;
  overflow: hidden;
  flex-grow: 1;
  flex-basis: 800px;
  min-height: 80vh;
}
.filesEmpty {
  width: 80vh;
  height: 80vh;
}
.right-side-bar {
  padding-left: 20px;
  width: 25%;
  flex-basis: 25%;
}
.toolbar-scanner {
  padding: 5px 0;
}
</style>