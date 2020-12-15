<template>
  <component :is="counterPartType" :isCard="false" :data="data" />
</template>

<script>
import personCard from "~/components/parties/person/card.vue";
import companyCard from "~/components/parties/company/card.vue";
import bankCard from "~/components/parties/bank/card.vue";
import dataApi from "~/static/dataApi";
export default {
  components: {
    personCard,
    companyCard,
    bankCard
  },
  async asyncData({ app, $axios, params }) {
    try {
      let getRequiestUrl;
      switch (params.type) {
        case "bank":
          getRequiestUrl = `${dataApi.contragents.Bank}/${params.id}`;
          break;
        case "person":
          getRequiestUrl = `${dataApi.contragents.Person}/${params.id}`;
          break;
        case "company":
          getRequiestUrl = `${dataApi.contragents.Company}/${params.id}`;
          break;
        default:
          throw "Unsupport counterPart type in load by id";
      }
      const { data } = await $axios.get(getRequiestUrl);
      return { data };
    } catch (e) {
      throw e;
    }
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
