<template>
  <section>
    <div class="d-flex align-center">
      <img class="item--icon" :src="data.icon" alt />
      <div class="title">{{data.title}}</div>
    </div>
    <div class="item--content">
      <div class="typeItem" v-for="item in data.items" :key="item.name">
        <nuxt-link :to="item.path" class="name link">{{item.name}}</nuxt-link>
        <div class="description">{{item.description}}</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["data"]
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/themes/generated/variables.base.scss";
.item--icon {
  object-position: top;
  object-fit: fill;
  width: 25px;
  flex-basis: 40px;
  padding: 8px;
}
.title {
  padding: 10px 0;
}
.align-center {
  align-items: center;
}
.item--content {
  flex-grow: 1;
  padding-left: 40px;
  .typeItem {
    width: auto;
    padding: 5px 0;
  }
  .typeItem:hover {
    background: lighten($base-border-color, 10%) ;
  }
}
.link {
  text-decoration: none;
  color: $base-accent;
}
</style>