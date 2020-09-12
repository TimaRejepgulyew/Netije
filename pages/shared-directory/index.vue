<template>
  <main class="admin">
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
  color: darken($base-border-color, 40%);
  font-size: 26px !important;
}
.title {
  color: darken($base-border-color, 40%);
}
.description {
  color: darken($base-border-color, 20%);
  font-size: 0.9em;
}
</style>
