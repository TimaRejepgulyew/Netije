<template>
  <main class="quide-page">
    <header class="quide-page__header">
      <h2 class="header-title">{{header.title}}</h2>
      <div>{{header.description}}</div>
    </header>
    <div class="container--grid">
      <div class="item">
        <guidPageItem :data="item" v-for="item in partiesItemsRightSide" :key="item.name" />
      </div>
      <div class="item">
        <guidPageItem :data="item" v-for="item in partiesItemsLeftSide" :key="item.name" />
      </div>
    </div>
  </main>
</template>

<script>
import guidPageItem from "~/components/quidePages/templates/list.vue";
import partiesGuidPageData from "~/components/quidePages/data/parties.js";
export default {
  components: {
    guidPageItem,
  },
  data() {
    const partiesItemsRightSide = partiesGuidPageData(this).filter(
      (el, index) => {
        if (index % 2 == 0) {
          return el;
        }
      }
    );
    const partiesItemsLeftSide = partiesGuidPageData(this).filter(
      (el, index) => {
        if (index % 2 != 0) {
          return el;
        }
      }
    );

    return {
      header: {
        title: this.$t("parties.headerTitle"),
        description: this.$t("parties.headerDescription"),
      },
      partiesItemsRightSide: partiesItemsRightSide,
      partiesItemsLeftSide: partiesItemsLeftSide,
    };
  },
};
</script>

<style >
</style>