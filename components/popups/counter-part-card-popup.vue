<template>
  <div>
    <component
      :is="options.type"
      :data="data"
      @valueChanged="valueChanged"
      @close="close"
      :isCard="true"
      v-if="data"
    />
    <component
      @valueChanged="valueChanged"
      @close="close"
      :is="options.type"
      v-if="!options.counterpartId"
    />
  </div>
</template>

<script>
import dataApi from "~/static/dataApi";
import person from "~/components/parties/person-card.vue";
import company from "~/components/parties/company-card.vue";
import bank from "~/components/parties/bank-card.vue";
export default {
  components: {
    person,
    company,
    bank,
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
      this.$emit("valueChanged", { data, updated: true });
      this.$emit("close");
    },
    close() {
      this.$emit("close");
    },
  },
  async created() {
    let getRequiestUrl;
    switch (this.options.type) {
      case "bank":
        getRequiestUrl = `${dataApi.contragents.Bank}/${this.options.counterpartId}`;
        break;
      case "person":
        getRequiestUrl = `${dataApi.contragents.Person}/${this.options.counterpartId}`;
        break;
      case "company":
        getRequiestUrl = `${dataApi.contragents.Company}/${this.options.counterpartId}`;
        break;
      default:
        break;
    }
    if (this.options.counterpartId) {
      const { data } = await this.$axios.get(getRequiestUrl);
      this.data = data;
    }
    this.$emit(
      "showTitle",
      this.data
        ? this.data.name
        : `${this.$t("translations.headers.counterPart")}: ${this.$t(
            "shared.newRecord"
          )}`
    );
    this.$emit("loadStatus");
  },
};
</script>

<style>
</style>