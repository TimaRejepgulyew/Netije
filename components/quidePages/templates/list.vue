<template>
  <section class="quide-list">
    <div class="d-flex align-center">
      <img class="item--icon" :src="data.icon" alt />
      <div class="title">{{data.title}}</div>
    </div>
    <div class="item--content">
      <div class="typeItem" v-for="item in data.items.filter(el=>el.visible)" :key="item.name">
        <div @click="toDetail(item.path)" class="name link">{{item.name}}</div>
        <div class="description">{{item.description}}</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    toDetail(path) {
      if (path) this.$router.push(path);
    },
  },
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
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
    .link {
      cursor: pointer;
      text-decoration: none;
      color: $base-accent;
    }

    .link:hover {
      color: #f90;
    }
  }
}
</style>
