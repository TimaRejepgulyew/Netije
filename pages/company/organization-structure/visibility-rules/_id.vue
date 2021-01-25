<template>
  <RuleCard :value="data" />
</template>

<script>
import RuleCard from "~/components/recipient/visibility/rule-card.vue";
import dataApi from "~/static/dataApi";
export default {
  components: {
    RuleCard
  },
  data() {
    return {
      data: null
    };
  },
  async asyncData({ $axios, params }) {
    const { data } = await $axios.get(
      `${dataApi.visibilityRule.rule}/${+params.id}`
    );
    return {
      data
    };
  }
};
</script>
    