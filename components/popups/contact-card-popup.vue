<template>
  <div>
    <contact
      v-if="rendered"
      @valueChanged="valueChanged"
      :isCard="true"
      :data="data"
      key="create"
    />
  </div>
</template>

<script>
import dataApi from "~/static/dataApi";
import contact from "~/components/parties/contact/card.vue";

export default {
  components: {
    contact
  },
  props: {
    options: {
      type: Object
    }
  },
  data() {
    return {
      rendered: false,
      data: {
        name: "",
        companyId: this.options.correspondentId,
        department: "",
        jobTitle: "",
        phone: "",
        fax: "",
        email: "",
        note: "",
        homepage: "",
        id: null,
        status: this.$store.getters["status/status"](this)[0].id
      }
    };
  },
  async created() {
    if (this.options.contactId) {
      const { data } = await this.$axios.get(
        `${dataApi.contragents.Contact}/${this.options.contactId}`
      );
      this.data = data;
    }
    this.showComponent();
    this.$emit(
      "showTitle",
      this.options.contactId
        ? this.data.name
        : `${this.$t("translations.headers.contact")}: ${this.$t(
            "shared.newRecord"
          )}`
    );
  },
  methods: {
    valueChanged(data) {
      console.log("data", data);
      this.$emit("valueChanged", data);
      this.$emit("close");
    },
    close() {
      this.$emit("close");
    },
    showComponent() {
      this.$emit("loadStatus");
      this.rendered = true;
    }
  }
};
</script>

<style></style>
