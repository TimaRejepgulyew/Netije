<template>
  <div class="nav-bar">
    <DxButton icon="check" :text="$t('translations.links.accept')"></DxButton>
    <DxButton :height="40" icon="arrowup" :text="$t('translations.links.modification')"></DxButton>
  </div>
</template>

<script>
import DxButton from "devextreme-vue/button";
export default {
  components: {
    DxButton
  },
  methods: {
    isPerformer() {
      return (
        this.store.performerId ==
        parseInt(this.$store.getters["permissons/employeeId"])
      );
    }
  }
};
</script>

<style>
</style>