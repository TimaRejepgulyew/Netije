<template>
  <form @submit.prevent="scanDocument">
    <Header
      :headerTitle="$t('scannerDialog.header')"
      :isbackButton="false"
      :isNew="false"
    ></Header>
    <toolbar
      class="toolbar-scanner"
      :documentValidatorName="documentValidatorName"
      @fileSaved="onFileSaved"
    />
    <main class="d-flex">
      <template v-if="isFilesEmpty">
        <left-side-bar class="left-side-bar"></left-side-bar>
        <current-page class="main" />
      </template>
      <div class="main" v-else>
        <scanner-icon />
        {{ $t("scannerDialog.downloadfile") }}
      </div>
      <right-side-bar
        :documentValidatorName="documentValidatorName"
        class="right-side-bar"
      />
    </main>
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Header from "~/components/page/page__header";
import scannerIcon from "~/components/scanner-dialog/scanner-icon.vue";
import currentPage from "./components/current-page.vue";
import leftSideBar from "./components/left-side-nav-bar.vue";
import toolbar from "./components/toolbar.vue";
import rightSideBar from "./components/right-side-nav-bar.vue";
export default {
  components: {
    Header,
    scannerIcon,
    toolbar,
    currentPage,
    leftSideBar,
    rightSideBar,
  },
  data() {
    return {
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
    onFileSaved() {},
    scanDocument() {
      this.$store.dispatch("scanner/scanDocument");
    },
  },
  computed: {
    ...mapGetters({ isFilesEmpty: "scanner/isFilesEmpty" }),
    hasActivePage() {
      return this.$store.getters["scanner/currentPageId"] != null;
    },
  },
};
</script>

<style lang="scss">
.left-side-bar {
  overflow-y: scroll;
  overflow-x: hidden;
  width: 25%;
  flex-basis: 25%;
}
.main {
  display: flex;
  justify-content: center;
  background: lightgray;
  overflow: hidden;
  flex-basis: 800px;
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