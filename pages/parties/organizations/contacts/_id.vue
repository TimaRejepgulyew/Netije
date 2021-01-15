<template>
  <div>
    <contactCard @valueChanged="gotTo" :data="currentContact" :isCard="false" />
  </div>
</template>

<script>
import dataApi from "~/static/dataApi";
import contactCard from "~/components/parties/contact/card.vue";
export default {
  components: {
    contactCard
  },
  data() {
    return {
      currentContact: null
    };
  },
  async asyncData({ $axios, params }) {
    const { data } = await $axios.get(
      `${dataApi.contragents.Contact}/${+params.id}`
    );
    return {
      currentContact: data
    };
  },
  methods: {
    gotTo() {
      this.$router.push("/parties/organizations/contacts");
    }
  }
};
</script>


