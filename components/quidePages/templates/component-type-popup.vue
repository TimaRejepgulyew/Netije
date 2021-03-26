<template>
  <div>
    <label :for="item.name" @click="showInformation" class="name guide--link">
      {{ item.name }}
    </label>
    <div class="description">{{ item.description }}</div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    showInformation() {
      this.$popup[this.item.params?.popupName](
        this,
        {
          ...this.item.params?.options,
        },
        {
          ...this.item.params?.popupOptions,
        }
      );
    },
  },
};
</script>

<style lang="scss">

.input_file {
  width: 1px;
  height: 1px;
  position: absolute;
  z-index: -1;
}
.guide--link {
  cursor: pointer;
  text-decoration: none;
  color: $base-accent;
}
.guide--link:hover {
  color: #f90;
}
</style>
