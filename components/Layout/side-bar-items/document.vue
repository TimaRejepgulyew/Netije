<template>
  <div class="d-flex justify-items-center">
    <i
      v-if="typeof item.icon == 'string'"
      class="dx-icon"
      :class="['dx-icon-' + item.icon]"
    ></i>

    <img v-else :src="item.icon" alt />
    <div v-if="documentsCount" class="counter counter--position">
      <span v-if="documentsCount < 1000">
        {{ documentsCount }}
      </span>
      <span v-else> +999 </span>
    </div>

    <div>{{ item.text }}</div>
  </div>
</template>

<script>
export default {
  props: ["item", "documentQueryModel"],
  computed: {
    documentsCount() {
      const value = this.documentQueryModel.getById(this.item.query).value;
      return this.$store.getters["document-count/documentCount"](
        value.charAt(0).toLowerCase() + value.slice(1)
      );
    },
  },
};
</script>
<style lang="scss" scoped>
i.dx-icon {
  width: 50px;
}
.justify-items-center {
  position: relative;
  justify-content: flex-start;
  width: 100%;
}
.side-bar__item {
  position: relative;
  justify-content: flex-start;
  width: 100%;
}
.counter {
  font-size: 12px;
  font-weight: bold;
  margin-left: auto;
  padding: 0;
  border-radius: 10px;
  color: rgba(0, 128, 0, 0.5);
}
.counter--position {
  position: relative;
  left: -10px;
  margin: 0 5px;
}
</style>