<template>
  <assignment-card
    @complete="backToRoute"
    :assignmentId="+$route.params.id"
    :isCard="false"
  />
</template>

<script>
import { load } from "~/infrastructure/services/assignmentService.js";
import assignmentCard from "~/components/assignment/index.vue";

export default {
  components: {
    assignmentCard
  },
  async asyncData({ app, params, router, $axios }) {
    await load({ $store: app.store, $axios }, +params.id);
  },
  methods: {
    backToRoute() {
      this.$router.go(-1);
    }
  }
};
</script>
