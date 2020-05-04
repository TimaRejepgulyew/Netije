<template>
  <div>
    <div class="list-container">
      <DxList
        :data-source="store"
        :activeStateEnabled="false"
        :focusStateEnabled="false"
        :search-enabled="false"
      >
        <template :active-state-enabled="false" #item="item">
          <div>
            <div class="list__content">
              <span class="text--bold">{{item.data.name}}</span>
            </div>
          </div>
        </template>
      </DxList>
    </div>
  </div>
</template>
<script>
import dataApi from "~/static/dataApi";
import DxList from "devextreme-vue/list";
import moment from "moment";
export default {
  components: {
    DxList
  },
  props: ["employee"],
  async created() {
    this.dataSource = await this.$axios.get(dataApi.company.Employee);
    this.store = await this.dataSource.data.data.filter(el => {
      return this.employee.find(id => {
        return id == el.id;
      });
    });
  },
  data() {
    return {
      store: [],
      dataSource: []
    };
  },

  methods: {}
};
</script>
<style lang="scss"  scoped>
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.list-container {
  border: 0.1px solid darken($base-bg, 15);
}
.list--comments {
  align-items: center;
  flex-wrap: wrap;
  .dx-icon-comment {
    border: 3px solid;
    border-radius: 30px;
    padding: 5px;
    margin: 0 5px;
    font-size: 25px;
  }
  .text--bold {
    font-weight: bold;
  }
}
</style>