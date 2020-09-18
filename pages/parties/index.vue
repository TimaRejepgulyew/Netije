<template>
  <main class="admin">
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
    const partiesItemsRightSide = partiesGuidPageData(
      this
    ).filter((el, index) => {
      if (index % 2 == 0) {
        return el;
      }
    });
    const partiesItemsLeftSide = partiesGuidPageData(
      this
    ).filter((el, index) => {
      if (index % 2 != 0) {
        return el;
      }
    });

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

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/themes/generated/variables.base.scss";

.container--grid {
  display: grid;
  grid-template-columns: 1fr 1fr;

  .item {
    justify-self: flex-start;
    width: 100%;
  }
}
.admin {
  padding: 20px 0 20px;
}
.quide-page__header {
  padding: 0;
  margin: 0 50px;
}
h2 {
  font-weight: 450;
  padding: 0;
  margin: 0 !important;
}
.header-title {
  font-size: 26px !important;
  color: darken($base-border-color, 40%);
}
.title {
  color: darken($base-border-color, 40%);
}
.description {
  color: darken($base-border-color, 20%);
  font-size: 0.9em;
}
</style>