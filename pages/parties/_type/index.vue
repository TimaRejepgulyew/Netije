<template>
  <component
    :is="counterPartType"
    :isCard="false"
    @selected="toDetail"
    @create="createCounterPart"
  />
</template>

<script>
import personGrid from "~/components/parties/person/grid.vue";
import companyGrid from "~/components/parties/company/grid.vue";
import bankGrid from "~/components/parties/bank/grid.vue";
import dataApi from "~/static/dataApi";
export default {
  components: {
    personGrid,
    companyGrid,
    bankGrid
  },

  data() {
    return {
      data: null
    };
  },
  computed: {
    counterPartType() {
      switch (this.$route.params.type) {
        case "company":
          return "company-grid";
        case "bank":
          return "bank-grid";
        case "person":
          return "person-grid";
        default:
          throw "Unsupport componentType in grid";
      }
    }
  },
  methods: {
    toDetail({ id }) {
      this.$router.push(`${this.$route.params.type}/${id}`);
    },
    createCounterPart() {
      this.$router.push(`${this.$route.params.type}/create`);
    }
  }
};
</script>
