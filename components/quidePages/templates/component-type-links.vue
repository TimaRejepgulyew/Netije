<template>
  <div>
    <div @click="toDetail(item.path)" class="name guide--link">
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
    }
  }
};
</script>

<style lang="scss" scoped>

.guide--link {
  cursor: pointer;
  text-decoration: none;
  color: $base-accent;
}
.guide--link:hover {
  color: #f90;
}
</style>
