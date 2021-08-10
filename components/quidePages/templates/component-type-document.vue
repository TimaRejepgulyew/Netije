<template>
  <div>
    <div @click="toDetail(item.path)">
      <span class="name guide--link">{{ item.name }}</span>
      <span v-if="count">({{ count }})</span>
    </div>
    <div class="description">{{ item.description }}</div>
  </div>
</template>

<script>
import { DocumentQuery } from "~/infrastructure/models/DocumentQuery";
export default {
  props: ["item"],
  methods: {
    toDetail(path) {
      if (path) this.$router.push(path);
    },
  },
  computed: {
    count() {
      const value = new DocumentQuery(this).getById(
        this.item.params.query
      ).value;
      return this.$store.getters["document-count/documentCount"](
        value.charAt(0).toLowerCase() + value.slice(1)
      );
    },
  },
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
