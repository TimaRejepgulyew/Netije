<template>
  <main class="quide-page">
    <header class="quide-page__header">
      <h2 class="header-title">{{header.title}}</h2>
      <div>{{header.description}}</div>
    </header>
    <div class="container--grid">
      <div class="item">
        <guidPageItem :data="item" v-for="item in paperWorkItemsRightSide" :key="item.name" />
      </div>
      <div class="item">
        <guidPageItem :data="item" v-for="item in paperWorkItemsLeftSide" :key="item.name" />
      </div>
    </div>
  </main>
</template>

<script>
import guidPageItem from "~/components/quidePages/templates/list.vue";
import paperWorkGuidPageData from "~/components/quidePages/data/paperWork.js";
export default {
  components: {
    guidPageItem,
  },
  data() {
    const paperWorkItemsRightSide = paperWorkGuidPageData(this).filter(
      (el, index) => {
        if (index % 2 == 0) {
          return el;
        }
      }
    );
    const paperWorkItemsLeftSide = paperWorkGuidPageData(this).filter(
      (el, index) => {
        if (index % 2 != 0) {
          return el;
        }
      }
    );

    return {
      header: {
        title: this.$t("paperWork.headerTitle"),
        description: this.$t("paperWork.headerDescription"),
      },
      paperWorkItemsRightSide: paperWorkItemsRightSide,
      paperWorkItemsLeftSide: paperWorkItemsLeftSide,
    };
  },
};
</script>

<style >
</style>