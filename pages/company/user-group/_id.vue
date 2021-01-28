<template>
  <group-card :value="data" />
</template>

<script>
import groupCard from "~/components/user-group/group-card.vue";
import dataApi from "~/static/dataApi";

export default {
  components: {
    groupCard
  },
  data() {
    return {
      data: null
    };
  },
  async asyncData({ $axios, params }) {
    const { data } = await $axios.get(
      `${dataApi.userGroup.group}/${+params.id}`
    );
    return {
      data
    };
  }
};
</script>


