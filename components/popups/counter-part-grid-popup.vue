<template>
  <counter-part-grid
    @valueChanged="valueChanged"
    :isCard="true"
  />
</template>

<script>
import counterPartGrid from "~/components/parties/counter-part-grid.vue";
export default {
  components: {
    counterPartGrid,
  },
  props: {
    options: {
      type: Object,
    },
  },
  data() {
    return {
      data: null,
    };
  },
  methods: {
    valueChanged(data) {
      this.$emit("valueChanged", { data });
      this.$emit("close");
    },
  },
  mounted() {
    this.$emit("loadStatus");
    this.$emit("showTitle", this.$t("menu.counterPart"));
  },
};
</script>

<style>
</style>