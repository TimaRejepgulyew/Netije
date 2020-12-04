<template>
  <div class="wrapper">
    <div class="column_names">
      <span class="item_name">{{ $t("licensing.information.id") }}</span>
      <span class="item_name">{{ $t("licensing.information.name") }}</span>
      <span class="item_name">{{
        $t("licensing.information.usersCount")
      }}</span>
      <span class="item_name">{{
        $t("licensing.information.expiration")
      }}</span>
    </div>
    <DxList :data-source="license">
      <template #item="{ data: item }">
        <div>
          <div class="item_wrapper">
            <div class="id" :title="item.id">
              <span class="item_value">
                {{ item.id }}
              </span>
            </div>
            <div class="name" :title="item.name">
              <span class="item_value">
                {{ item.name }}
              </span>
            </div>
            <div class="usersCount">
              <span class="item_value">
                {{ item.usersCount }}
              </span>
            </div>
            <div class="expiration">
              <span class="item_value" v-if="item.isTrial">
                {{ formatDate(item.expiration) }}</span
              >
              <span class="item_value" v-else>{{
                $t("licensing.information.isTrial")
              }}</span>
            </div>
          </div>
        </div>
      </template>
    </DxList>
  </div>
</template>

<script>
import dataApi from "~/static/dataApi";
import DocumentService from "~/infrastructure/services/documentVersionService";
import DxList from "devextreme-vue/list";
import moment from "moment";

export default {
  components: {
    DxList,
  },
  props: {
    options: {
      type: Object,
    },
  },
  data() {
    return {
      license: null,
    };
  },
  methods: {
    formatDate(value) {
      return moment(value).format("MM.DD.YYYY HH:mm");
    },
  },
  async created() {
    let { data } = await this.$axios.get(dataApi.licensing.getLicense);
    this.license = data;
    this.$emit("showTitle", this.$t("licensing.information.title"));
    this.$emit("loadStatus");
  },
};
</script>

<style lang="scss">
.item_wrapper {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(4, 20vw);
  grid-column-gap: 20px;
  justify-items: center;
}
.column_names {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(4, 20vw);
  grid-column-gap: 20px;
  justify-items: center;
  padding: 10px;
  overflow: hidden;
}
.item_name {
  font-size: 16px;
  font-weight: bold;
}
.item_value {
  display: block;
  font-size: 16px;
  overflow: hidden;
  width: 20vw;
  text-align: center;
}
</style>
