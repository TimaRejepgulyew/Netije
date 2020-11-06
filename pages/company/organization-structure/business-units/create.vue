<template>
  <div>
    <Header :headerTitle="$t('menu.createBusinessUnit')"></Header>
    <company-card />
  </div>
</template>

<script>
import Header from "~/components/page/page__header";
import CompanyCard from "~/components/company/organization-structure/card.vue";
export default {
  components: {
    Header,
    CompanyCard,
  },
};
</script>

<style lang="scss" scoped>
</style>