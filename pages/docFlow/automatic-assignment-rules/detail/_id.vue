<template>
  <automatic-assignment-rules-card @close="onClose" :currentRule="currentRule" :isCard="false" />
</template>

<script>
import automaticAssignmentRulesCard from "~/components/docFlow/automatic-assignment-rules/card.vue";
import dataApi from "~/static/dataApi";
export default {
  components: {
    automaticAssignmentRulesCard
  },
  data() {
    return {
      currentRule: null
    };
  },
  methods: {
    onClose() {
      this.$router.push(`/docFlow/automatic-assignment-rules`);
    }
  },
  async asyncData({ $axios, params }) {
    if (params.id) {
      const { data } = await $axios.get(
        `${dataApi.accessRights.getById + params.id}`
      );
      return {
        currentRule: data
      };
    } else {
      return {
        currentRule: null
      };
    }
  }
};
</script>

<style></style>
