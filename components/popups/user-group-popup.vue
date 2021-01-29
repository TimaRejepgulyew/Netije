<template>
  <group-card v-if="showCard" :isCard="true" :value="data" />
</template>

<script>
import groupCard from "~/components/user-group/group-card.vue";
import dataApi from "~/static/dataApi";

export default {
  components: {
    groupCard
  },
  props: {
    options: {
      type: Object
    }
  },
  data() {
    return {
      data: null,
      showCard: false,
      headerTitle: this.$t("companyStructure.groups.group")
    };
  },
  async created() {
    if (this.options.id) {
      const { data } = await this.$axios.get(
        `${dataApi.userGroup.group}/${this.options.id}`
      );
      this.data = data;
      this.headerTitle = data.name;
    }
    await this.$emit("showTitle", this.headerTitle);
    this.$emit("loadStatus");
    this.showCard = true;
  }
};
</script>


