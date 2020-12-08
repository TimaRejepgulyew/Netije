<template>
  <section class="quide-list">
    <div class="d-flex align-center">
      <img class="item--icon" :src="data.icon" alt />
      <div class="title">{{ data.title }}</div>
    </div>
    <div class="item--content">
      <div
        class="typeItem"
        v-for="item in data.items.filter((el) => el.visible)"
        :key="item.name"
      >
        <component :is="item.componentType || 'isLink'" :item="item" />
      </div>
    </div>
  </section>
</template>

<script>
import isLink from "./component-type-links";
import uploadBtn from "./component-type-import-btn";
import Popup from "./component-type-popup.vue";
export default {
  props: ["data"],
  components: {
    isLink,
    uploadBtn,
    Popup,
  },
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";

.align-center {
  align-items: center;
}
.quide-list {
  .item--icon {
    object-position: top;
    object-fit: fill;
    width: 25px;
    flex-basis: 40px;
    padding: 5px;
  }
  .title {
    padding: 10px;
  }

  .item--content {
    flex-grow: 1;
    padding-left: 40px;
    .typeItem {
      width: auto;
      padding: 10px;
    }
    .typeItem:hover {
      background: lighten($base-border-color, 10%);
    }
  }
}
</style>
