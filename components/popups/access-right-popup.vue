<template>
  <accessRightList
    @valueChanged="valueChanged"
    :entityId="options.entityId"
    :entityType="options.entityType"
    :data="data"
    v-if="data"
  />
</template>

<script>
import dataApi from "~/static/dataApi";
import accessRightList from "~/components/access-right/entity-access-right/access-right-list.vue";
export default {
  components: {
    accessRightList,
  },
  props: {
    options: {
      type: Object,
    },
  },
  data() {
    return {
      data: null,
    };
  },
  methods: {
    valueChanged(data) {
      this.$emit("valueChanged", data);
    },
  },
  async created() {
    console.log(this.options);
    const { data } = await this.$axios.get(
      `${dataApi.accessRights.List}${this.options.entityType}/${this.options.entityId}`
    );
    this.data = data;
    this.$emit("loadStatus");
    this.$emit("showTitle", data.name);
    this.$emit("showTitle", this.$t("shared.accessRight"));
  },
};
</script>