<template>
  <div>
    <div @click="toDetail(item.path)" class="name link">
      {{ item.name }}
    </div>
    <div class="description">{{ item.description }}</div>
  </div>
</template>

<script>
export default {
  props: ["item"],
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
.link {
  cursor: pointer;
  text-decoration: none;
  color: $base-accent;
}
.link:hover {
  color: #f90;
}
</style>
