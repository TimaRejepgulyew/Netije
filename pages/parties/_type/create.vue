<template>
  <div>
    <component :isCard="false" @created="backTo" :is="counterPartType" :data="data" />
  </div>
</template>

<script>
import personCard from "~/components/parties/person/card.vue";
import companyCard from "~/components/parties/company/card.vue";
import bankCard from "~/components/parties/bank/card.vue";
export default {
  components: {
    personCard,
    companyCard,
    bankCard
  },
  data() {
    return {
      data: null
    };
  },
  methods: {
    backTo() {
      this.$router.go(-1);
    }
  },
  computed: {
    counterPartType() {
      switch (this.$route.params.type) {
        case "company":
          return "company-card";
        case "bank":
          return "bank-card";
        case "person":
          return "person-card";
        default:
          throw "Unsupport componentType in create";
      }
    }
  }
};
</script>

<style></style>
