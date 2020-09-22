<template>
  <main class="quide-page">
    <header class="quide-page__header">
      <h2 class="header-title">{{header.title}}</h2>
      <div>{{header.description}}</div>
    </header>
    <div class="container--grid">
      <div class="item">
        <guidPageItem :data="item" v-for="item in sharedDirectoryItemsRightSide" :key="item.name" />
      </div>
      <div class="item">
        <guidPageItem :data="item" v-for="item in sharedDirectoryItemsLeftSide" :key="item.name" />
      </div>
    </div>
  </main>
</template>

<script>
import guidPageItem from "~/components/quidePages/templates/list.vue";
import sharedDirectoryGuidPageData from "~/components/quidePages/data/sharedDirectory.js";
export default {
  components: {
    guidPageItem,
  },
  data() {
    const sharedDirectoryItemsRightSide = sharedDirectoryGuidPageData(
      this
    ).filter((el, index) => {
      if (index % 2 == 0) {
        return el;
      }
    });
    const sharedDirectoryItemsLeftSide = sharedDirectoryGuidPageData(
      this
    ).filter((el, index) => {
      if (index % 2 != 0) {
        return el;
      }
    });

    return {
      header: {
        title: this.$t("sharedDirectory.headerTitle"),
        description: this.$t("sharedDirectory.headerDescription"),
      },
      sharedDirectoryItemsRightSide: sharedDirectoryItemsRightSide,
      sharedDirectoryItemsLeftSide: sharedDirectoryItemsLeftSide,
    };
  },
};
</script>

<style >
</style>
