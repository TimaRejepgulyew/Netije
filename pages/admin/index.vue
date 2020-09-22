<template>
  <main class="quide-page">
    <header class="quide-page__header">
      <h2 class="header-title">{{header.title}}</h2>
      <div>{{header.description}}</div>
    </header>
    <div class="container--grid">
      <div class="item">
        <guidPageItem :data="item" v-for="item in administrationItemsRightSide" :key="item.name" />
      </div>
      <div class="item">
        <guidPageItem :data="item" v-for="item in administrationItemsLeftSide" :key="item.name" />
      </div>
    </div>
  </main>
</template>

<script>
import guidPageItem from "~/components/quidePages/templates/list.vue";
import administrationGuidPageData from "~/components/quidePages/data/administration.js";
export default {
  components: {
    guidPageItem,
  },
  data() {
    const administrationItemsRightSide = administrationGuidPageData(
      this
    ).filter((el, index) => {
      if (index % 2 == 0) {
        return el;
      }
    });
    const administrationItemsLeftSide = administrationGuidPageData(this).filter(
      (el, index) => {
        if (index % 2 != 0) {
          return el;
        }
      }
    );

    return {
      header: {
        title: this.$t("administration.headerTitle"),
        description: this.$t("administration.headerDescription"),
      },
      administrationItemsRightSide: administrationItemsRightSide,
      administrationItemsLeftSide: administrationItemsLeftSide,
    };
  },
};
</script>

<style >
</style>
