<template>
  <div>
    <div class="list-container">
      <DxList
        :data-source="store"
        :activeStateEnabled="false"
        :hoverStateEnabled="false"
        :focusStateEnabled="false"
        :search-enabled="false"
      >
        <template :active-state-enabled="false" #item="item">
          <div>
            <div class="list__content">{{item.data.name}}</div>
          </div>
        </template>
      </DxList>
    </div>
  </div>
</template>
<script>
import dataApi from "~/static/dataApi";
import DxList from "devextreme-vue/list";

export default {
  components: {
    DxList
  },
  props: ["recipient"],
  async created() {
    this.dataSource = await this.$axios.get(dataApi.company.Employee);
    this.store = await this.dataSource.data.data.filter(el => {
      return this.recipient.find(id => {
        return id == el.id;
      });
    });
  },
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