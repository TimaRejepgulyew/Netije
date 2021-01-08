<template>
  <DxButton
    icon="info"
    stylingMode="text"
    @click="getManual"
    :text="$t('buttons.manual')"
  />
</template>

<script>
import DxButton from "devextreme-vue/button";
export default {
  components: {
    DxButton,
  },
  methods: {
    getManual() {
      window.open(`/Manual-${this.$i18n.locale}.pdf`, "_blank");
    },
  },
};
</script>

<style>
</style>