<template>
  <department-card
    :isCard="true"
    v-if="data"
    :data="data"
  />
</template>

<script>
import dataApi from "~/static/dataApi";
import departmentCard from "~/components/company/organization-structure/departments/card.vue";
export default {
  components: {
    departmentCard
  },
  props: {
    options: {
      type: Object
    }
  },
  data() {
    return {
      data: null
    };
  },
  async created() {
    const { data } = await this.$axios.get(
      `${dataApi.company.Department}/${this.options.departmentId}`
    );
    this.data = data;
    this.$emit("loadStatus");
    this.$emit("showTitle", data.name);
  },
  methods: {
    
  }
};
</script>

<style></style>
