<template>
  <div>
    <contactCard @valueChanged="gotTo" :isCard="false" />
  </div>
</template>

<script>
import contactCard from "~/components/parties/contact/card.vue";
export default {
  components: {
    contactCard
  },
  methods: {
    gotTo() {
      this.$router.push("/parties/organizations/contacts");
    }
  }
};
</script>