<template>
  <main class="doc-flow">
    <div class="container--grid">
      <div class="item">
        <doc-flow-item
          :data="item"
          v-for="item in docFlowItemsRightSide.filter(el=>el.visible)"
          :key="item.name"
        />
      </div>
      <div class="item">
        <doc-flow-item :data="item" v-for="item in docFlowItemsLeftSide" :key="item.name" />
      </div>
    </div>
  </main>
</template>

<script>
import docFlowItem from "~/components/docFlow/guidPage/doc-flow-item.vue";
import docFlowItemData from "~/components/docFlow/guidPage/docFlowItem.js";
export default {
  components: {
    docFlowItem
  },
  data() {
    const docFlowItemsRightSide = docFlowItemData(this).filter((el, index) => {
      if (index % 2 == 0) {
        return el;
      }
    });
    const docFlowItemsLeftSide = docFlowItemData(this).filter((el, index) => {
      if (index % 2 != 0) {
        return el;
      }
    });

    return {
      header: {
        title: this.$t("docFlow.headerTitle"),
        description: this.$t("docFlow.headerDescription")
      },
      docFlowItemsRightSide: docFlowItemsRightSide,
      docFlowItemsLeftSide: docFlowItemsLeftSide
    };
  }
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
.doc-flow {
  padding: 20px 0 20px;
}
.title {
  color: darken($base-border-color, 40%);
}
.description {
  color: darken($base-border-color, 20%);
  font-size: 0.9em;
}
</style>