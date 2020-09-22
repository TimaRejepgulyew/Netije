<template>
  <main class="quide-page">
    <header class="quide-page__header">
      <h2 class="header-title">{{header.title}}</h2>
      <div>{{header.description}}</div>
    </header>
    <div class="container--grid">
      <div class="item">
        <guidPageItem
          :data="item"
          v-for="item in docFlowItemsRightSide.filter(el=>el.visible)"
          :key="item.name"
        />
      </div>
      <div class="item">
        <guidPageItem :data="item" v-for="item in docFlowItemsLeftSide" :key="item.name" />
      </div>
    </div>
  </main>
</template>

<script>
import guidPageItem from "~/components/quidePages/templates/list.vue";
import docFlowGuidPageData from "~/components/quidePages/data/docFlow.js";
export default {
  components: {
    guidPageItem,
  },
  data() {
    const docFlowItemsRightSide = docFlowGuidPageData(this).filter(
      (el, index) => {
        if (index % 2 == 0) {
          return el;
        }
      }
    );
    const docFlowItemsLeftSide = docFlowGuidPageData(this).filter(
      (el, index) => {
        if (index % 2 != 0) {
          return el;
        }
      }
    );

    return {
      header: {
        title: this.$t("docFlow.headerTitle"),
        description: this.$t("docFlow.headerDescription"),
      },
      docFlowItemsRightSide: docFlowItemsRightSide,
      docFlowItemsLeftSide: docFlowItemsLeftSide,
    };
  },
};
</script>

<style >
</style>
