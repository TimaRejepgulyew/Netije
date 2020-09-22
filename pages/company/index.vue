<template>
  <main class="admin">
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
  padding-bottom: 20px;
  .header-title {
    font-size: 26px !important;
    color: darken($base-border-color, 40%);
  }
  h2 {
    font-weight: 450;
    padding: 0;
    margin: 0 !important;
  }
}
.title {
  color: darken($base-border-color, 40%);
}
.description {
  color: darken($base-border-color, 20%);
  font-size: 0.9em;
}

</style>