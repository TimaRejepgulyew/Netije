<template>
  <main class="quide-page">
    <header class="quide-page__header">
      <h2 class="header-title">{{header.title}}</h2>
      <div>{{header.description}}</div>
    </header>
    <div class="container--grid">
      <div class="item">
        <guidPageItem :data="item" v-for="item in companyStructureItemsRightSide" :key="item.name" />
      </div>
      <div class="item">
        <guidPageItem :data="item" v-for="item in companyStructureItemsLeftSide" :key="item.name" />
      </div>
    </div>
  </main>
</template>

<script>
import guidPageItem from "~/components/quidePages/templates/list.vue";
import companyStructureGuidPageData from "~/components/quidePages/data/companyStructure.js";
export default {
  components: {
    guidPageItem,
  },
  data() {
    const companyStructureItemsRightSide = companyStructureGuidPageData(
      this
    ).filter((el, index) => {
      if (index % 2 == 0) {
        return el;
      }
    });
    const companyStructureItemsLeftSide = companyStructureGuidPageData(
      this
    ).filter((el, index) => {
      if (index % 2 != 0) {
        return el;
      }
    });

    return {
      header: {
        title: this.$t("companyStructure.headerTitle"),
        description: this.$t("companyStructure.headerDescription"),
      },
      companyStructureItemsRightSide: companyStructureItemsRightSide,
      companyStructureItemsLeftSide: companyStructureItemsLeftSide,
    };
  },
};
</script>

<style>
</style>